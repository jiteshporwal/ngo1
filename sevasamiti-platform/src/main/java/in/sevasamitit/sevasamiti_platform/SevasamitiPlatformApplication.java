package in.sevasamitit.sevasamiti_platform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class SevasamitiPlatformApplication {



	public static void main(String[] args) {
		SpringApplication.run(SevasamitiPlatformApplication.class, args);

	}
}
