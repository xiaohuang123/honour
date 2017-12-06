package cn.test.email.model;

import java.io.Serializable;
import java.util.Date;

public class TPaperHistory implements Serializable{

	private Integer phid;
	
	private Integer uid;//用户id
	
	private Integer pid;//试卷id
	
	private Integer totalscore;//总得分
	
	private String detailscore;//详细得分
	
	private Integer greading;//评卷方式，0：自动评分，1：人工评分
	
	private Date created;//创建时间

	public Integer getPhid() {
		return phid;
	}

	public void setPhid(Integer phid) {
		this.phid = phid;
	}

	public Integer getUid() {
		return uid;
	}

	public void setUid(Integer uid) {
		this.uid = uid;
	}

	public Integer getPid() {
		return pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	public Integer getTotalscore() {
		return totalscore;
	}

	public void setTotalscore(Integer totalscore) {
		this.totalscore = totalscore;
	}

	public String getDetailscore() {
		return detailscore;
	}

	public void setDetailscore(String detailscore) {
		this.detailscore = detailscore;
	}

	public Integer getGreading() {
		return greading;
	}

	public void setGreading(Integer greading) {
		this.greading = greading;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}
	
	
	
}
