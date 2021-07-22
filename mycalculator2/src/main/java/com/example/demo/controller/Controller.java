package com.example.demo.controller;
import com.example.demo.Icalculator.mycalculator;
import com.example.demo.services.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class Controller {

    @Autowired
    private Services service;


    @RequestMapping(method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    ModelAndView index()
    {
        return new ModelAndView("calculator");
    }


    @PostMapping(value = {"/calculate"})
        public String add(@RequestBody mycalculator a){
        return service.calculate(a);
    }
    @PostMapping(value = {"/single"})
        public String perform(@RequestBody mycalculator a){
        return service.One_Operand(a);
    }

    }

