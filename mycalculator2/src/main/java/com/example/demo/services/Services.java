package com.example.demo.services;

import com.example.demo.Icalculator.mycalculator;
import org.springframework.stereotype.Service;

@Service
public class Services{
    public String calculate( mycalculator a){
        if (a.getOperation().equals("+")){
            return String.valueOf((String.format("%.4f",a.getA()+a.getB())));}
        else if(a.getOperation().equals("-")){
            return String.valueOf((String.format("%.4f",a.getA()-a.getB())));}
        else if(a.getOperation().equals("*")){
            return String.valueOf((String.format("%.4f",a.getA()*a.getB())));
        }
        else if(a.getOperation().equals("/")){
            if(a.getB()==0){
                return "E MATH ERROR";
            }
            else {
            return String.valueOf((String.format("%.4f",a.getA()/a.getB())));}
        }
        else {return "Unsupported operation";}
    }
    public String One_Operand(mycalculator a){
        if(a.getOperation().equals("sqrt")){
            if(a.getB()<0){return "E MATH ERROR";}
            return String.valueOf((String.format("%.4f",Math.sqrt(a.getB()))));
        }
        else if (a.getOperation().equals("reverse")){
            if(a.getB()==0){
                return "E MATH ERROR";
            }
            else {
                return String.valueOf(String.valueOf(String.format("%.4f",(1/a.getB()))));
            }
        }
        else if(a.getOperation().equals("square")){
            return String.valueOf(String.format("%.4f",Math.pow(a.getB(),2)));
        }
        else if(a.getOperation().equals("percentage")){
            return String.valueOf(String.format("%.4f",((a.getB()/100)*a.getA())));
        }
        else {
            return "Unsupported operation";
        }
    }
}
