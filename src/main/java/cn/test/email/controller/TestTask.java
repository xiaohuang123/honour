package cn.test.email.controller;

import java.util.Date;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component("testTask")
public class TestTask {
	
//	@Scheduled(cron="0 0 0 * * MON")
	@Scheduled(cron="2 * * * * *")
	public void testMON(){
		System.out.println("-----------"+ new Date());
	}
}
