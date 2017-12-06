package cn.test.email.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.test.email.exception.CustomException;
import cn.test.email.mapping.UsersMapper;
import cn.test.email.model.Users;
import cn.test.email.service.IUserService;

@Service("IUserService")
public class IUserServiceImpl implements IUserService{
	
	@Autowired
	private UsersMapper usersMapper;

	public void insertUser(Users users) throws Exception {
		
		
		if(usersMapper.selectByPrimaryKey(users.getName())!=null){
			throw new CustomException("该用户名已注册，请重新注册");
		}
		
		
		usersMapper.insertSelective(users);
	}

	public Users selectName(String name) throws Exception {
		
		Users user=usersMapper.selectByPrimaryKey(name);
		return user;
	}

	public Users selectUsers(Users user) throws Exception {
		Users u=usersMapper.selectByUsers(user);
		
		if(u==null){
			throw new CustomException("登陆信息错误！");
		}
		
		return u;
	}

	/**
	 * 提升用的级别
	 */
	@Override
	public void updateRankDo(Users u) {
		// TODO Auto-generated method stub
		usersMapper.updateRank(u);
	}

	@Override
	public Users findUserByPhone(Users user) {
		/*UserExample example = new UserExample();
		Criteria criteria = example.createCriteria();
		criteria.andPhoneEqualTo(user.getPhone());
		List<User> userList = userMapper.selectByExample(example);
		if(userList.isEmpty()){
			return null;
		}
		return userList.get(0);*/
		return usersMapper.selectByPrimaryKey(user.getName());
	}

}
