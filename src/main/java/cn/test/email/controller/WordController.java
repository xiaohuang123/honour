package cn.test.email.controller;
import  java.io.FileInputStream;  
import  java.io.IOException;  
import  java.util.ArrayList;  
import  java.util.Iterator;  
import  java.util.List;  
import  org.apache.poi.hwpf.HWPFDocument;  
import  org.apache.poi.hwpf.usermodel.Paragraph;  
import  org.apache.poi.hwpf.usermodel.Range;  
import  org.apache.poi.hwpf.usermodel.Table;  
import  org.apache.poi.hwpf.usermodel.TableCell;  
import  org.apache.poi.hwpf.usermodel.TableIterator;  
import  org.apache.poi.hwpf.usermodel.TableRow;  
import  org.apache.poi.poifs.filesystem.POIFSFileSystem; 
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/word")
public class WordController {
	@RequestMapping("myword")
	public static List<String> myword(String string){
		FileInputStream in =  null ;  
        POIFSFileSystem pfs =  null ;  
        List <String> list =  new  ArrayList <String>();  
         try{  
            in =  new FileInputStream("G:\\123.doc"); //载入文档  
            pfs =  new  POIFSFileSystem(in);  
            HWPFDocument hwpf =  new HWPFDocument(pfs);  
            Range range = hwpf.getRange(); //得到文档的读取范围  
            TableIterator it =  new  TableIterator(range);  
            //迭代文档中的表格  
            if  (it.hasNext()){  
                TableRow tr =  null ;  
                TableCell td =  null ;  
                String lineString;  
                String cellString;  
                Table tb =it.next();  
                //迭代行，从第2行开始  
                for  (int  i =  2 ; i <tb.numRows(); i ++){  
                    tr = tb.getRow(i);  
                    lineString =  "";  
                    for (int  j =  0 ; j <tr.numCells(); j ++){  
                        td = tr.getCell(j); //取得单元格  
                        //取得单元格的内容  
                        for  (int  k =  0 ; k <td.numParagraphs(); k ++){  
                        	Paragraph para = td.getParagraph(k);  
                            cellString = para.text();  
                            if  (cellString!=  null  
                                    && cellString.compareTo("" )!= 0){  
                                //如果不修剪，取出的内容后会有一个乱码字符  
                                cellString = cellString.trim()+ "|";  
                            }  
                            lineString += cellString;  
                        }  
                    }  
                    //去除字符串末尾的一个管道符  
                    if  (lineString!=  null  && lineString.compareTo("" )!=  0 ){  
                        lineString = lineString.substring(0 ,lineString.length() -  1 );  
                    }  
                    list.add(lineString);  
                }  
            }  
        }  catch (Exception  e){  
            e.printStackTrace();  
        }  finally {  
            if  (null  != in){  
                try {  
                    in.close();  
                }  catch (IOException e){  
                    e.printStackTrace();  
                }  
            }  
        }  
        return list;  
    }  
  public static void main(String[] args) {
	 List list = WordController.myword("G:\\123.doc");  
        for  (Iterator iter = list.iterator(); iter.hasNext();){  
            String str =(String)iter.next();  
          System.err.println(str);
        	}
       
	}
}
