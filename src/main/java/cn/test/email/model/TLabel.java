package cn.test.email.model;

import java.io.Serializable;

public class TLabel implements Serializable{

	private Integer lid;
	
	private String label;

	public Integer getLid() {
		return lid;
	}

	public void setLid(Integer lid) {
		this.lid = lid;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}
	
	
}
