package kr.stockey.investmentservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableScheduling
@EnableAspectJAutoProxy
@EnableEurekaClient
public class InvestmentServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(InvestmentServiceApplication.class, args);
    }

}
