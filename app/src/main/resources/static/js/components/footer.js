// js/components/footer.js

/**
 * Renders the reusable footer component into the #footer placeholder.
 * This ensures branding and navigation consistency across all dashboard pages.
 */
function renderFooter() {
    // 1. Access the Footer Container
    const footer = document.getElementById("footer");

    // Safety check: only proceed if the element exists on the current page
    if (!footer) return;

    // 2. Inject HTML Content
    footer.innerHTML = `
        <footer class="footer">
            <div class="footer-container">
                <div class="footer-logo">
                    <img src="../assets/images/logo/logo.png" alt="Clinic Logo" />
                    <p>© Copyright 2026 Clinic Management System</p>
                </div>

                <div class="footer-links">
                    <div class="footer-column">
                        <h4>Company</h4>
                        <a href="#">About Us</a>
                        <a href="#">Careers</a>
                        <a href="#">Press</a>
                    </div>

                    <div class="footer-column">
                        <h4>Support</h4>
                        <a href="#">Account</a>
                        <a href="#">Help Center</a>
                        <a href="#">Contact</a>
                    </div>

                    <div class="footer-column">
                        <h4>Legals</h4>
                        <a href="#">Terms of Use</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Licensing</a>
                    </div>
                </div>
            </div>
        </footer>
    `;
}

// 3. Call the Function
// Executes automatically when the script is loaded by the browser
renderFooter();