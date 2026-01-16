package com.project.back_end.controllers;

import com.project.back_end.models.Admin;
import com.project.back_end.services.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("${api.path}" + "admin")
public class AdminController {

    @Autowired
    private CommonService commonService;

    /**
     * Endpoint for admin login.
     * Validates credentials and returns a JWT token if successful.
     * @param admin The admin credentials provided in the request body.
     * @return ResponseEntity containing either a token and role, or an error message.
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> adminLogin(@RequestBody Admin admin) {
        return commonService.validateAdmin(admin);
    }
}