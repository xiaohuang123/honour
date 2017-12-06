package cn.test.email.service;

import cn.test.email.model.Users;

public interface IUserService {
	
	//注册用户
	public void insertUser(Users users) throws Exception;
	
	//检验用户表中是否存在相同的用户名
	public Users selectName(String name) throws Exception;
	
	//检验用户的用户名和密码是否正确
	public Users selectUsers(Users user) throws Exception;

	public void updateRankDo(Users u);

	public Users findUserByPhone(Users user);
	
	
	

}
