package cn.test.email.model;

import java.util.List;

public class PageBean<T> {


	private Integer pageNum;//当前页码
	private Integer totalPage;//总页数
	private Integer pageCount=1;//每页数据记录数将   数据初始化
	private Integer totalCount=0;//总数据条数    数据初始化避免出现null
	private List<T> dataList;
	private Integer dbBegin;//每页的开始数据
	
	
	
	
	public void setPageCount(Integer pageCount) {
		this.pageCount = pageCount;
	}
	public Integer getPageNum() {
		return pageNum;
	}
	public void setPageNum(Integer pageNum) {
		this.pageNum = pageNum;
	}
	public Integer getTotalPage() {
		int  tp = (int) Math.ceil(totalCount*1.0/pageCount);
		return tp;
	}
	
	public Integer getPageCount() {
		return pageCount;
	}
	
	public Integer getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(Integer totalCount) {
		this.totalCount = totalCount;
	}
	
	public List<T> getDataList() {
		return dataList;
	}
	public void setDataList(List<T> dataList) {
		this.dataList = dataList;
	}
	public Integer getDbBegin() {
		return (pageNum-1)*pageCount;
	}
}
