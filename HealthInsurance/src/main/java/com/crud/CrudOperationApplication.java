package com.crud;

import com.crud.entity.Admin;
import com.crud.enums.Role;
import com.crud.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CrudOperationApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudOperationApplication.class, args);
	}

	@Bean
	CommandLineRunner createSuperAdmin(AdminRepository adminRepository) {
		return args -> {
			// Check if a SUPER_ADMIN already exists
			boolean superAdminExists = adminRepository.findByRole(Role.SUPER_ADMIN)
					.stream().findAny().isPresent();

			if (!superAdminExists) {
				Admin superAdmin = new Admin();
				superAdmin.setEmail("ghadagesuyog3@gmail.com");
				superAdmin.setUsername("SUPER_ADMIN");
				superAdmin.setRole(Role.SUPER_ADMIN);

				adminRepository.save(superAdmin);
				System.out.println("SUPER_ADMIN created successfully!");
			}
		};
	}
}
