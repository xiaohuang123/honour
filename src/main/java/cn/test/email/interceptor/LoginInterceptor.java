package cn.test.email.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;


import cn.test.email.model.Users;

public class LoginInterceptor implements HandlerInterceptor {
	
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		String reqUri=request.getRequestURI();//获取request中的uri地址
		//如果有提交订单，查看订单的uri拦截 
		if(!reqUri.contains("/login.do") && !reqUri.contains("/registerFindUser.do") && !reqUri.contains("/home.do") && !reqUri.contains("/dologin.do")
				&& !reqUri.contains("/register.do") && !reqUri.contains("/doregister.do")){
			
			//判断用户是否登录
			HttpSession session=request.getSession();
			//去session里面查找用户信息
			Users user=(Users)session.getAttribute("loginUser");
			if(user==null){ //用户未登录
				//跳转到登录页面
				response.sendRedirect(request.getContextPath()+"/user/login.do");
				session.setAttribute("msg","您还未登陆，请登陆！");
				return false; //不放行
			}else{ //已经登录
				return true;
			}
		}
		return true;
	}


	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub

	}


	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		// TODO Auto-generated method stub

	}

	

}
