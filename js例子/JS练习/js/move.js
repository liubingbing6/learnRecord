//JavaScript Document
function getStyle(obj,name){//��ȡ�ڵ��Ԫ������
	if(obj.currentStyle){//����IE�����
		return obj.currentStyle[name];
		}
	else{
		return getComputedStyle(obj,false)[name];//����Chrom������������
		}
	}
function startMove(obj,json,func){//���ú�������obj��������ﵽjson�е�Ҫ��func��һ����������obj��ɺ����һ��������������Ϊ��ʽ�˶���
	clearInterval(obj.timer);//�رն�ʱ��
obj.timer=setInterval(function(){//�򿪶�ʱ��
	var allTimerStop=true;						//���裺���еĶ�ʱ�����Ѿ��ر�   
	for(var attr in json)//ѭ������json�����е�ÿһ��Ҫ�ﵽĿ�������ֵ
	{
		if(attr=='opacity'){//��͸�������Ե������ã�������赱ǰ������Ϊopacity
			cur=Math.round(parseFloat(getStyle(obj,attr))*100);//��Ϊopacityֵ��С��������������������ȡ��
			}
		else{
			cur=parseInt(getStyle(obj,attr));//��øýڵ�������ĵ�����
			}
		var speed=(json[attr]-cur)/8; //����һ��ֵ����ʾ�ı���ٶ�
		speed=speed>0?Math.ceil(speed):Math.floor(speed);//���ٶ�ȡ��
		
		if(json[attr]!=cur){//�ж�ֻҪ��ǰ��һ������ֵû�ﵽԤ�ڣ��Ƕ�ʱ���Ͳ��ܹرգ���֮����ر�
			allTimerStop=false; 
			}
		if(attr=='opacity'){//�����ǰ��͸���ȱ仯�����������Բ���
			obj.style.filter='alpha(opacity:'+(speed+cur)+')';//IE����
			obj.style.opacity=(cur+speed)/100;//�����Chrom�����������
			}
		else{
				obj.style[attr]=cur+speed+'px';//�Ե�ǰ����
			}
	 }
	 	if(allTimerStop){//������еĶ�ʱ�����ر��ˣ���Ϊtrue
			clearInterval(obj.timer);
			if(func)func();//���func�������ڣ��Ǿ�ִ����
			}
		  
		},30);
	}