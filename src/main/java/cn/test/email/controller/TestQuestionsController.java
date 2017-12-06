package cn.test.email.controller;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.logging.Logger;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

//import com.sun.tools.corba.se.idl.constExpr.And;

import cn.test.email.model.ErrorQuestion;
import cn.test.email.model.ErrorQuestionVo;
import cn.test.email.model.PageBean;
import cn.test.email.model.TExamQuestion;
import cn.test.email.model.TExamQuestionVo;
import cn.test.email.service.TestQuestionsService;

@Controller
public class TestQuestionsController {

	@Autowired
	private TestQuestionsService testQuestionsService;
	
	private Logger logger=Logger.getAnonymousLogger();
	/**
	 * 跳转到添加试题页面
	 * @return
	 */
	@RequestMapping("/add.do")
	public String add(String type,Model model,Integer sid){
		/**
		 * 根据试题的类型跳转到不同的添加页面
		 */
	if(type!=null){
		if(type.equals("1")){
			model.addAttribute("type", type);
//			model.addAttribute("sid", sid);
			return "my-question-bank";
		}else if(type.equals("2")){
			model.addAttribute("type", type);
//			model.addAttribute("sid", sid);
			return "my-question-bank_2";
		}
	}else{
		return "redirect:/toMyExam.do";
	}
		model.addAttribute("type", type);
		model.addAttribute("sid", sid);
		
		return "my-question-bank_3";
		
	}
	
	/**
	 * 添加试题
	 * @throws Exception 
	 */
	@RequestMapping("/addDo.do")
	public String addDo(TExamQuestion tExamQuestion,String[] options) {

		if(options!=null && options.length>1){
			String st="";
			for (int i = 0; i < options.length; i++) {
				st+=options[i]+",";
			}
			tExamQuestion.set_option(st);
		}else if(options!=null && options.length==1){
			tExamQuestion.set_option(options[0]);
		}
		
		
		try {
			testQuestionsService.addQuestion(tExamQuestion);
		} catch (Exception e) {
			logger.info("添加失败");
		}
		String type = tExamQuestion.getType();//试题的类型
//		Integer sid = tExamQuestion.getSid();//试题所属子卷的ID
		return "redirect:/showQuestion.do?type="+type;
	}
	
	/**
	 *进入展示页面
	 */
	@RequestMapping("/showQuestion.do")
	public String showQuestion(@RequestParam(defaultValue="1") Integer pageIndex
			,@RequestParam(defaultValue="1") Integer pageCount,Model model,TExamQuestionVo tqv){
		PageBean<TExamQuestion> pb = testQuestionsService.selectAllQuestion(pageIndex,tqv,pageCount);
		model.addAttribute("pb",pb);
		model.addAttribute("tqv",tqv);
		String type = tqv.getType();//试题的类型
		if(type!=null){
			if(type.equals("1")){
				return "examCore";	
			}else if(type.equals("2")){
				return "examCore_2";
			}
		}else{
			return "redirect:/toMyExam.do";
		}
		return "examCore_3";	
	}
	
	/**
	 * 删除试题
	 * @throws Exception 
	 * 张晨
	 */
	@RequestMapping("/deleteDo.do")
	public String deleteDo(Integer id,String type,Integer sid) throws Exception{
		testQuestionsService.deleteDo(id);
		return "redirect:/showQuestion.do?sid="+sid+"&type="+type;
	}
	
	/**
	 * 跳转到编辑页面
	 * 张晨
	 */
	@RequestMapping("/update.do")
	public String update(Integer id,Model model){
		TExamQuestion tExamQuestion = testQuestionsService.selectQuestionById(id);
		model.addAttribute("teq", tExamQuestion);
		String type = tExamQuestion.getType();//试题的类型
		/**
		 * 根据不同的试题类型跳转到不同的修改页面
		 */
	if(type!=null){
		if(type.equals("1")){
			return "updateQuestion";
		}else if(type.equals("2")){
			return "updateQuestion_2";
		}
	}else{
		return "redirect:/toMyExam.do";
	}
		return "updateQuestion_3";
	}
	
	/**
	 * 修改试题
	 * @throws Exception 
	 */
	@RequestMapping("/updateDo.do")
	public String updateDo(TExamQuestion tExamQuestion,String[] options){
		
		try {
			testQuestionsService.updateDo(tExamQuestion,options);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			logger.info("修改失败！");
		}
		String type = tExamQuestion.getType();//试题的类型
//		Integer sid = tExamQuestion.getSid();//试题所属子卷的ID
		return "redirect:/showQuestion.do?type="+type;
	}
	
	/**
	 * 选择批量删除
	 */
	@RequestMapping("/selectDel.do")
	public String selectDel(Integer[] qid,String type,Integer sid){
		List<Integer> ids=new ArrayList<Integer>();
		
		for (int i = 0; i < qid.length; i++) {
			ids.add(qid[i]);
		}
		try {
			testQuestionsService.selectDelete(ids);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			logger.info("批量删除失败！");
		}
		return "redirect:/showQuestion.do?sid="+sid+"&type="+type;
	}
	
	/**
	 * 根据Sid 查询子卷下的所有试题
	 * @throws UnsupportedEncodingException 
	 */
	@RequestMapping("/selectBySidDo.do")
	public String selectBySidDo(Integer sid,String spname,Model model) throws UnsupportedEncodingException{
		List<TExamQuestion> teq = testQuestionsService.selectBySid(sid);
		spname=new String(spname.getBytes("ISO-8859-1"),"UTF-8");
		
		model.addAttribute("teq",teq);
		model.addAttribute("spname", spname);
		return "my-exam";
	}
	
	
	/**
	 * 保存统计的用户错误的试题信息
	 */
	@RequestMapping("/saveCountExam.do")
	public String  saveCountExam(String countExam,HttpSession session){
		try {
			testQuestionsService.saveErrorQuestion(countExam,session);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			logger.info("保存错误试题信息失败！");
		}
		return "redirect:/showErrorQuestion.do";
	}
	
	
	/**
	 * 展示用户错误试题
	 */
	@RequestMapping("/showErrorQuestion.do")
	public String showErrorQuestion(HttpSession session,@RequestParam(defaultValue="1") Integer pageIndex
			,@RequestParam(defaultValue="1") Integer pageCount,ErrorQuestionVo eqv,Model model){
		PageBean<ErrorQuestion> pageBean = testQuestionsService.selectErrorQuestionAll(session,eqv,pageIndex,pageCount);
		model.addAttribute("pb",pageBean);
		System.out.println(pageCount);
		return "errorQuestion";
	}
	
	/**
	 * 跳转到随机生成试题页面
	 */
	@RequestMapping("/randomQuestion.do")
	public String randomQuestion(HttpSession session){
		List<TExamQuestion> allQuestion = testQuestionsService.findAll();
		session.setAttribute("allQuestion", allQuestion);
		return "randomQuestion";
	}
	
	/**
	 * 随机出题
	 */
	@RequestMapping("/randomQuestionDo.do")
	public String randomQuestionDo(@RequestParam(defaultValue="0") Integer type,Integer rank,
			@RequestParam(defaultValue="5") Integer num,HttpSession session,Model model){
		List<TExamQuestion> aq = (List<TExamQuestion>) session.getAttribute("allQuestion");
		List<TExamQuestion> rq=new ArrayList<TExamQuestion>();
		
		if(aq!=null){
			/**
			 * 打乱集合的顺序
			 */
			Collections.shuffle(aq);
			for (TExamQuestion qt: aq) {
				int parseInt = Integer.parseInt(qt.getType());
				Integer rank2 = qt.getRank();
				if(rq.size()==num){
					break;
				}
				if(type==0 && rank >= rank2){
					rq.add(qt);
				}else{
					if(parseInt==type  && rank >= rank2){
						rq.add(qt);
					}
				}
			}
			
		}
		model.addAttribute("rq", rq);
		return "randomQuestion";
	}
	
	
	/**
	 * 随机出题
	 * 让提升用户VIP等级
	 */
	@RequestMapping("/vipRandomQuestion.do")
	public String vipRandomQuestion(Integer rank,Model model){
		
		if(rank>=4){
			model.addAttribute("vipmsg","目前您的VIP级别已是最高！");
			return "userExam";
		}
		
		List<TExamQuestion> aq = testQuestionsService.selectByRank(rank);
		List<TExamQuestion> rq=new ArrayList<TExamQuestion>();
		
		if(aq!=null){
			/**
			 * 打乱集合的顺序
			 */
			Collections.shuffle(aq);
			for (TExamQuestion qt: aq) {
				//给用户随机出10道题
				if(rq.size()==10){
					break;
				}
				int parseInt = Integer.parseInt(qt.getType());
				if(qt.getRank()==rank && parseInt!=2){
					rq.add(qt);
				}
			}
		}
		model.addAttribute("rq", rq);
		return "vipRandomQuestion";
	}
	
	
	
}
