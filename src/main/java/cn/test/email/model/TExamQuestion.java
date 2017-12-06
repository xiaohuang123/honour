package cn.test.email.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SuppressWarnings("serial")
public class TExamQuestion implements Serializable{

		private Integer id;

	    private String title;//题干

	    private String _option;//选项

	    private String answer;//答案或解析
	    
	    private  String type;//题型

	    private String label;//标签
	    
	    private Integer rank;//难易程度 1：初级，2：中级，3：高级
	    
	    private Date created;//创建时间
	    
	    private List<String> ops=new ArrayList<String>();

		public Integer getId() {
			return id;
		}

		public void setId(Integer id) {
			this.id = id;
		}

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public String get_option() {
			return _option;
		}

		public void set_option(String _option) {
			this._option = _option;
		}

		public String getAnswer() {
			return answer;
		}

		public void setAnswer(String answer) {
			this.answer = answer;
		}

		public String getType() {
			return type;
		}

		public void setType(String type) {
			this.type = type;
		}

		public String getLabel() {
			return label;
		}

		public void setLabel(String label) {
			this.label = label;
		}

		public Integer getRank() {
			return rank;
		}

		public void setRank(Integer rank) {
			this.rank = rank;
		}

		public Date getCreated() {
			return created;
		}

		public void setCreated(Date created) {
			this.created = created;
		}

		public List<String> getOps() {
			return ops;
		}

		public void setOps(List<String> ops) {
			this.ops = ops;
		}
	    
	    
	    
}
