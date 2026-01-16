const BASE_URL = 'https://naveenvenve-8080.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai';
const DOCTOR_API = `${BASE_URL}/doctor`;

export const getDoctors = async () => {
    try {
        const response = await fetch(`${DOCTOR_API}/all`);
        const data = await response.json();
        return data.doctors || [];
    } catch (error) {
        console.error("Fetch doctors failed:", error);
        return [];
    }
};

export const deleteDoctor = async (id, token) => {
    try {
        const response = await fetch(`${DOCTOR_API}/delete/${id}/${token}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return { success: response.ok, message: data.message || "Deleted" };
    } catch (error) {
        console.error("Delete failed:", error);
        return { success: false, message: "Error deleting doctor" };
    }
};

export const saveDoctor = async (doctor, token) => {
    try {
        const response = await fetch(`${DOCTOR_API}/add/${token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(doctor)
        });
        const data = await response.json();
        return { success: response.ok, message: data.message || "Saved" };
    } catch (error) {
        console.error("Save failed:", error);
        return { success: false, message: "Error saving doctor" };
    }
};

export const filterDoctors = async (name, time, specialty) => {
    try {
        const response = await fetch(`${DOCTOR_API}/filter/${name}/${time}/${specialty}`);
        if (response.ok) {
            return await response.json();
        }
        console.error("Filter request failed");
        return { doctors: [] };
    } catch (error) {
        alert("Error filtering doctors");
        return { doctors: [] };
    }
};