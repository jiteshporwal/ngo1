package in.sevasamitit.sevasamiti_platform;

import org.springframework.boot.SpringApplication;

public class TestSevasamitiPlatformApplication {

	public static void main(String[] args) {
		SpringApplication.from(SevasamitiPlatformApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
