package com.crud.entity;

import com.crud.enums.AdminStatus;
import com.crud.enums.Role;
import jakarta.persistence.*;
import lombok.Data;



@Data
@Entity
@Table(name = "admins")
public class Admin {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String password;
    private String username;
    private String gstNumber;

    @Enumerated(EnumType.STRING)
    private AdminStatus status = AdminStatus.PENDING;

    @Enumerated(EnumType.STRING)
    private Role role;

}
