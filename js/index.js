window.onload = function(){
	
	var table = document.getElementById("cartTable");
	var tr = table.children[1].rows;
	var selectedTotal = document.getElementById("selectedTotal");
	var priceTotal = document.getElementById("priceTotal");

	// 全选功能
	var checkInputs = document.getElementsByClassName("check");
	var checkAllInput = document.getElementsByClassName("check-all")[0];

	for(var i=0;i<checkInputs.length;i++){
		checkInputs[i].onclick = function(){
			if(this.className == "check check-all"){
				for(var j=0;j<checkInputs.length;j++){
					checkInputs[j].checked = this.checked;
				}
			}
			if(this.checked == false){
				checkAllInput.checked = false;
			}
			getTotal();
		}
		
	}

	//计算合计价格
	function getTotal(){
		var selected = 0;
		var price = 0;
		for(var i = 0; i < tr.length; i++){
			if(tr[i].getElementsByTagName("input")[0].checked){
				selected += parseInt(tr[i].getElementsByTagName("input")[1].value);
				price += parseFloat(tr[i].cells[4].innerText);
			}
			
		}
		selectedTotal.innerHTML = selected;
		priceTotal.innerHTML = price.toFixed(2);
		
	}
	//数量加减
	for(var i = 0; i < tr.length; i++){
		tr[i].onclick = function(e){
			var e = e || window.event;
			var el = e.target || e.srcElement; //事件代理
			//e.target支持火狐
			//console.log(el);
			var cls = el.className;

			var input = this.getElementsByTagName("input")[1];
			var value = parseInt(input.value);

			switch(cls){
				case 'add':
					input.value = value + 1;
					getSubTotal(this);
					break;
				case 'reduce':
					if(value > 1){
						input.value = value - 1;
						getSubTotal(this);
					}
					break;
				case 'delete':
					var conf = confirm("确定要删除商品吗");
					if(conf){
						this.parentNode.removeChild(this);
					}
				default :
					break;
			}
			 getTotal();
		};
		//手动输入加入keyup事件
		tr[i].getElementsByTagName('input')[1].onkeyup = function (){
            var val = parseInt(this.value);
            if (isNaN(val) || val <= 0) {
                val = 1;
            }
            if (this.value != val) {
                this.value = val;
            }
            getSubTotal(this.parentNode.parentNode.parentNode); //更新小计
            getTotal(); //更新总数
        }
	}

	//计算单行价格
	function getSubTotal(tr){
		var cells = tr.cells;
		var price = cells[2]; //单价
		var subTotal = cells[4];
		var countInput = tr.getElementsByTagName("input")[1];
		//alert(parseInt(price.innerText))

		subTotal.innerHTML = (parseInt(countInput.value) * parseFloat(price.innerText)).toFixed(1) + "元";
		//subTotal.style.color = "#ff6700";
	}
}