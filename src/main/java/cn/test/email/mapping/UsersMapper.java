package cn.test.email.mapping;

import cn.test.email.model.Users;

public interface UsersMapper {
	
    int deleteByPrimaryKey(String name);

    int insert(Users record);

    int insertSelective(Users record);

    Users selectByPrimaryKey(String name);

    int updateByPrimaryKeySelective(Users record);

    int updateByPrimaryKey(Users record);
    
    Users selectByUsers(Users user);

	void updateRank(Users u);
}