package cn.test.email.model;

public class QuestionType {
    private Integer id;

    private String type;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type == null ? null : type.trim();
    }

	@Override
	public String toString() {
		return "QuestionType [id=" + id + ", type=" + type + "]";
	}
   
}