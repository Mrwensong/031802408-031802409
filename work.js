

$(function(){	
	$("button").on('click',function(){
		//输入处理
   		var s =document.getElementById("text1").value;
		var reg = new RegExp(/导师：/g);
		s=s.replace(reg,"导师,");
		var reg = new RegExp(/级博士生：/g);
		s=s.replace(reg,"级博士生,");
		var reg = new RegExp(/级硕士生：/g);
		s=s.replace(reg,"级硕士生,");
		var reg = new RegExp(/级本科生：/g);
		s=s.replace(reg,"级本科生,");
		var reg = new RegExp(" ","g");
		s=s.replace(reg,"");
		var reg = new RegExp("：","g");
		s=s.replace(reg,"？：");
		var length=s.length;
		if (s[length-1].match(/\n|\r/g))
		{
			alert("文本末不能有空行！");
			return;
		}
		var reg = /\n(\n)*( )*(\n)*\n/g;
		s = s.replace(reg,"\n");
   		var dic={}
		var  ss = s.split(/、|\n|：|,|\r|\t|\ +/g); 
		console.log(ss);
		var num1=0;
		var num2=0;
		var num3=0;
		var num4=0;
		var num5=0;
		var num6=0;
		var num7=0;
		var ele;
		var tc9=0;
		var i=0;
		if(ss[0]!="导师"){
			alert("请输入以导师开头的格式！");
			return;
		}
		else{
			//处理导师节点
		while(i<ss.length){

			for(;i<ss.length;i++){
				console.log(ss[i]);
				if(i==0){
					if(ss[i]=="导师"){
						ele='<li id="id4'+num4+'">'+
						'<span  id="id5'+num5+'" class="badge badge-success"> '+ss[i]+'</span>'+
						'</li>';
						$("#Tree").html(ele);
						num4++;
						i++;
						ele='<ul><li id="tc9'+tc9+'">'+
						'<span id="teacher"> '+ss[i]+'</span>'+
						'</li></ul>';
						$('#id5'+num5).after(ele);
						dic[ss[i]]="tc9"+tc9.toString();////////////////////	
						num5++;
					}
					else{
						break;
					} 
					console.log(ss[i]);
				}
				else{
					if(ss[i]=="导师"){
						ele='<li id="id4'+num4+'">'+
						'<span  id="id5'+num5+'" class="badge badge-success"> 导师</span>'+
						'</li>';
						$('#id4'+(num4-1)).after(ele);
						num4++;
						i++;
						ele='<ul><li id="tc9'+tc9+'">'+
						'<span id="teacher"> '+ss[i]+'</span></li></u1>';
						$('#id5'+num5).after(ele);
						dic[ss[i]]="tc9"+tc9.toString();////////////////////
						num5++;
					}
					else{
						break;
					} 
					console.log(ss[i]);
				}	
			}
			//处理其他节点
			while(i<ss.length){
				//添加技能和公司
				if(ss[i].match(/？$/g)){
					console.log(ss[i]);
					ss[i]=ss[i].replace("？","");
					var j=1;
					var k=1;
					for(;j<ss.length;j++){
						if(ss[i]==ss[j]){
								break;
						}
					}
					for(;i<ss.length;i++)
					{
						if(ss[i].match(/？$/g)){
							break;
						}
						if(k==1){
							k++;
						}

						else if(k==2){
							ele='<ul ><li id="id6'+num6+'"><span id="id7'+num7+'"></span></li></ul>';
							$('#'+dic[ss[j]]).after(ele);
							$('#id7'+num7).html(ss[i]);
							num6++;
							num7++;
							k++;
						}
						else{
							ele='<li id="id6'+num6+'"><span id="id7'+num7+'"> </span></li>';
							$('#id6'+(num6-1)).after(ele);
							$('#id7'+num7).html(ss[i]);
							num6++;
							num7++;
						}
					}
				}
				else{
					if(ss[i].match(/(([0-9]+)级博士生)|(([0-9]+)级硕士生)|(([0-9]+)级本科生)/g)){
						ele='<li><span id="id1'+num1+'" class="badge badge-success"> '+
						'</span></li>';
						$('#tc9'+tc9).after(ele);
						$('#id1'+num1).html(ss[i]);
						dic[ss[i]]="id1"+num1.toString();////////////////////
						console.log(ss[i]);
						i++;
						var j=1;
						for(;i<ss.length;i++){
							console.log(ss[i]);
							if(ss[i].match(/(([0-9]+)级博士生)|？$|(([0-9]+)级硕士生)|(([0-9]+)级本科生)|导师/)){
								i--;
								break;
							}
							if(j==1){
								ele='<ul><li id="id3'+num3+'"><span id="id2'+num2+'"> </span></li></u1>';
								$('#id1'+num1).after(ele);
								dic[ss[i]]="id3"+num3.toString();/////////////////////
								j++;
							}
							else{
								ele='<li id="id3'+num3+'"><span id="id2'+num2+'"> </span></li>';
								dic[ss[i]]="id3"+num3.toString();////////////////////////
								$('#id3'+(num3-1)).after(ele);
							}
							$('#id2'+num2).html(ss[i]);
							num2=num2+1;
							num3=num3+1;
							console.log(ss[i]);
						}  
						num1=num1+1;
					}
					else{
						break;
					}
					
					i++;
					if(ss[i]=="导师"){
						break;
					}
					console.log(ss[i]);
				}				
			}
			tc9++;
		}
		}
		
//折叠处理
		$('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');

		$('.tree li.parent_li > span').on('click', function (e) {
			var children = $(this).parent('li.parent_li').find(' > ul > li');
			if (children.is(":visible")) {
				children.hide('fast');
				$(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
    		} 
			else {
				children.show('fast');
				$(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
			}
    		e.stopPropagation();
		});
		
		$(document).ready(function()
		{
			$("#Tree ul li").next("ul").hide();
			$("#Tree ul li").click(function()
		{
			$(this).next("ul").toggle();
});
});

		
	});
});
	


