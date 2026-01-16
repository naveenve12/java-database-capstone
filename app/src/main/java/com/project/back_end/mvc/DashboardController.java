package com.project.back_end.mvc;

import com.project.back_end.services.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

@Controller
public class DashboardController {

    @Autowired
    private CommonService commonService;

    @GetMapping("/adminDashboard/{token}")
    public String adminDashboard(@PathVariable String token) {
        ResponseEntity<Map<String, String>> response = commonService.validateToken(token, "admin");
        
        if (response.getStatusCode() == HttpStatus.OK) {
            return "admin/adminDashboard";
        } else {
            return "redirect:/";
        }
    }

    @GetMapping("/doctorDashboard/{token}")
    public String doctorDashboard(@PathVariable String token) {
        ResponseEntity<Map<String, String>> response = commonService.validateToken(token, "doctor");
        
        if (response.getStatusCode() == HttpStatus.OK) {
            return "doctor/doctorDashboard";
        } else {
            return "redirect:/";
        }
    }
}