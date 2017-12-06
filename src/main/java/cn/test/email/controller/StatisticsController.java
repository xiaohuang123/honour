package cn.test.email.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.test.email.model.QuestionType;
import cn.test.email.model.Users;
import cn.test.email.service.StatisticsService;

@Controller
public class StatisticsController {

	@Autowired
	private StatisticsService statisticsService;

	/**
	 * json单个查询错题
	 * @param users
	 * @return
	 */
	@ResponseBody
	@RequestMapping("getErrorCount.do")
	public List<QuestionType> getErrorCount(Users users) {

		List<QuestionType> types = statisticsService.getErrorCount(users);

		for (QuestionType questionType : types) {

			System.out.println("错题类型 :" + questionType.getType() + "---个数：" + questionType.getId());
		}
		return types;

	}

	/**
	 * json单个查询全部题型
	 * @param users
	 * @return
	 */
	@ResponseBody
	@RequestMapping("getQuestionCount.do")
	public List<QuestionType> getQuestionCount(Users users) {

		List<QuestionType> questionCount = statisticsService.getQuestionCount();

		for (QuestionType questionType : questionCount) {

			System.out.println("全部题型 :" + questionType.getType() + "---个数：" + questionType.getId());
		}

		return questionCount;

	}

	/**
	 * 方法访问,向首页展示
	 * @param users
	 * @param model
	 * @return
	 */
	@RequestMapping("getQuestionNum.do")
	public String getQuestion(Model model,Integer rank,HttpSession session) {
		
		Users users = (Users) session.getAttribute("loginUser");

		/*List<QuestionType> types = statisticsService.getErrorCount(users);

		for (QuestionType questionType : types) {

			System.out.println("错题类型 :" + questionType.getType() + "---个数：" + questionType.getId());
		}

		List<QuestionType> questionCount = statisticsService.getQuestionCount();
		
        Integer questionNum = -1 ;
        
		for (QuestionType questionType : questionCount) {
			
			questionNum+=questionType.getId();
			
			System.out.println("全部题型 :" + questionType.getType() + "---个数：" + questionType.getId());
		}

		model.addAttribute("questionNum", questionNum);
		model.addAttribute("rank", rank);
		model.addAttribute("errorQuestion", types);
		model.addAttribute("allQuestion", questionCount);*/
		return "show/show1";

	}

}
