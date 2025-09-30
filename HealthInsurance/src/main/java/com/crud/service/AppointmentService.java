package com.crud.service;

import com.crud.dto.AppointmentRequest;
import com.crud.entity.Appointment;

import java.util.List;

public interface AppointmentService {

    // Book a new appointment
    Appointment bookAppointment(AppointmentRequest request);

    // Get appointments by doctor
    List<Appointment> getAppointmentsByDoctorId(Long doctorId);

    // Get appointments by user profile
    List<Appointment> getAppointmentsByUserProfileId(Long userProfileId);

    //  Get all appointments (for Super Admin)
    List<Appointment> getAllAppointments();
}
