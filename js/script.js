
var debug = "";
s="";
var fr="";
window.onload = function()
{
	fraodec="";
	operacion = "";
	cifras = []; //Guardará las cifras...
	var operaciones = [
						{
							"tipo" 		: "Suma", 
							"operador"	: "+", 
							"code"		: 187
						},
						{
							"tipo" 		: "Resta", 
							"operador"	: "-", 
							"code"		: 189
						},
						{
							"tipo" 		: "Multiplicación", 
							"operador"	: "x", 
							"code"		: 88
						},
						{
							"tipo" 		: "División", 
							"operador"	: "%", 
							"code"		: 68
						}];
	//Para capturar los números...
	for(var i = 0; i <= 9; i++)
	{
		nom_div("numero_" + i).addEventListener('click', function(event)
		{
			capturaValor(event.target.id.split("_")[1], 1);
		});
		if(i >= 1 && i <= 4)
		{
			//Para los operadores...
			nom_div("operador_" + i).addEventListener('click', function(event)
			{
				var operador = Number(event.target.id.split("_")[1]);
				capturaValor(operaciones[operador - 1].operador, 2);
			});
			//Para las demás acciones (limpiar, igual y punto)...
		}
		if(i >= 1 && i <= 7)
		{
			nom_div("acciones_" + i).addEventListener('click', function(event)
			{
				var accion = Number(event.target.id.split("_")[1]);
				switch(accion)
				{
					case 1: capturaValor("", 3); break;
					case 2: capturaValor("", 4); break;
					case 3: capturaValor("", 5); break;
					case 4: capturaValor("(", 6); break;
					case 5: capturaValor(")", 7); break;
					case 6: borrarUltimo(); break;
					case 7: 
					
					s=nom_div("acciones_7").innerHTML;
					if(s == "Decimal")
					{
						ofraDec();
					}
					else
					{
						oDecfra();
					}

					break;
				}
			});
		}
	}

	var oDecfra = function()
	{
		var separa = operacion.split("/")
		numerador=separa[0];
		denominador=separa[1];
		operacion = numerador / denominador;
		operacion=operacion.toString();
		cifras = [];
		cifras[0] = operacion;
		nom_div("pantalla").innerHTML = operacion;
	    nom_div("acciones_7").innerHTML = "Decimal";
		nom_div("acciones_2").innerHTML = ".";
	}

	//Para cambiar de fraccionarios a decimales y vicerversa...
	var ofraDec = function()
	{		
		console.log("Cambia a fraccionarios");
		var nume;
		var deno;
		var sep;
		sep = operacion.split(".")
		var pun = "";
		var largo = "1";
		var t;
		pun=sep[1].length;
		console.log(sep);
		console.log(pun);
		if(pun>0)
		{
		for(t = 1 ; t <= pun ; t++)
			{
				largo = largo + "0";
			   	console.log(largo);
			}
			operacion = operacion * largo;
			operacion = operacion + "/"+largo;
			console.log(operacion);
		}
		sep = operacion.split("/")
		nume=sep[0];
		deno=sep[1];
		if(nume<0)
			{
				nume = nume*-1
				console.log(nume);
				for(t=2;t<=nume; t++)
				{
					if(nume % t == 0 && deno % t == 0)
						{
							nume=nume/t;
							deno=deno/t;
							console.log(nume+"/"+deno)
						}
					operacion = "-" + nume + "/"+deno;
				}
			}
		else
		{
				for(t=2;t<=nume; t++)
				{
					if(nume % t == 0 && deno % t == 0)
						{
							nume=nume/t;
							deno=deno/t;
							console.log(nume+"/"+deno)
						}
					operacion = nume + "/"+deno;
				}
		}
		cifras = [];
		cifras[0] = operacion;
		nom_div("pantalla").innerHTML = operacion;
		nom_div("acciones_7").innerHTML = "fraccion";
		nom_div("acciones_2").innerHTML = "/";
	};

	//Captura el valor dado...
	var capturaValor = function(valor, tipo)
	{
		var imprime = false;
		if(tipo === 1)//Números...
		{
			operacion += valor;
			var cont = 0;
			cifras[cont] = "";
			for(var c = 0; c < operacion.length; c++)
			{
				if(!existeOperador(operacion.charAt(c)) || operacion.charAt(c) === ".")
				{
					if(operacion.charAt(c) !== "(" && operacion.charAt(c) !== ")")
					{
						cifras[cont] += operacion.charAt(c);
					}
				}
				else
				{
					cont++;
					cifras[cont] = "";
				}
			}
			imprime = true;
		}
		else
		{
			//Para los operadores Matemáticos...
			if(tipo === 2)
			{
				//Saber si el final hay un operador...
				var ultimo = operacion.charAt(operacion.length - 1);
				if(!existeOperador(ultimo))
				{
					imprime = true;
					operacion += valor;
				}
			}
			else
			{
				//Para Borrar...
				if(tipo === 3)
				{
					imprime = true;
					operacion = "";
					cifras = [];
				}
				else
				{
					//Para el punto...
					if(tipo === 4)
					{
						
						fr=nom_div("acciones_2").innerHTML;
						console.log(fr);
						if(fr == ".")
						{
							console.log("aita");
							if(operacion !== "")
							{							
								//Traer la última cifra...
								var ultimaCifra = cifras[cifras.length - 1];
								//Buscar si ya existe un punto...
								if(ultimaCifra.indexOf(".") < 0)
								{
									imprime = true;
									operacion += ".";
									cifras[cifras.length - 1] += ".";
								}
							}
						}
						if(fr == "/")
						{
							console.log("entro");
							if(operacion !== "")
							{							
								//Traer la última cifra...
								var ultimaCifra = cifras[0][cifras[0].length-1];
								if(ultimaCifra != "/")
								{
									console.log("entro hasta aca");
									imprime = true;
									operacion += "/";
									cifras[cifras.length - 1] += "/";
								}
							}
						}
					}
					else
					{
						//Para el igual...
						if(tipo === 5)
						{
							//Buscar al final si existe un operador...
							if(operacion !== "")
							{
								var ultimo = operacion.charAt(operacion.length - 1);
								if(existeOperador(ultimo))
								{
									operacion = operacion.substr(0, operacion.length - 1);
								}
								//Sustituir los valores de división y multiplicación...
								var reemplaza = [{busca : 	"x", cambia	: 	"*"}, 
												 {busca : 	"%", cambia	: 	"/"}];
								for(var i in reemplaza)
								{
									do
									{
										if(operacion.indexOf(reemplaza[i].busca) >= 0)
										{
											operacion = operacion.replace(reemplaza[i].busca, reemplaza[i].cambia);
										}
										else
										{
											break;
										}
									}while(1);
								}
								//Capturar el error...
								try
								{
									var respuesta = eval(operacion);
									operacion = String(respuesta);
									cifras = [];
									cifras[0] = operacion;
									imprime = true;
								}
								catch(e)
								{
									swal({
					                    title: "Error en la operación",
					                    text: e.message, 
					                    showCancelButton: false,   
					                    confirmButtonColor: "#DD6B55",  
					                    confirmButtonText: "Aceptar", 
					                    closeOnConfirm: false, 
					                    type: "error"
					                });
								}
							}
						}
						else
						{
							if(tipo === 6 || tipo === 7)
							{
								operacion += valor;
								imprime = true;
							}
						}
					}
				}
			}
		}
		if(imprime)
		{
			tamanoFuente();
			nom_div("pantalla").innerHTML = operacion;
		}
	};

	//Para saber si existe un operador...
	var existeOperador = function(operador)
	{
		var existe = false; //Para saber si existe un operador al final...
		//Saber si es un operador...
		for(var c in operaciones)
		{
			if(operaciones[c].operador === operador)
			{
				existe = true;
				break;
			}
		}
		return existe;
	};

	//Borrar el último caractert...
	var borrarUltimo = function()
	{
		if(operacion.length >= 0)
		{
			operacion = operacion.substr(0, operacion.length - 1);
			tamanoFuente();
			nom_div("pantalla").innerHTML = operacion;
		}
	};

	//Cambiar el tamaño de la fuente...
	var tamanoFuente = function()
	{
		var fuente = 220;
		var maximoFuente = 10;
		if(operacion.length > maximoFuente)
		{
			fuente -= Math.round(fuente * ((operacion.length + 25) / 100));
		}
		nom_div("pantalla").style.fontSize = fuente + "%";
	};


	//Para validar el teclado...
	window.onkeydown = function(e)
	{
		var code = e.keyCode ? e.keyCode : e.which;
		if(code === 66) //Para borrar...
		{
			borrarUltimo();
		}
		else
		{
			if(code === 70) //Para Cambiar de tipo de operación...
			{
				ofraDec();
			}
			else
			{
				accionesTeclado(code, 1);
			}
		}
	};

	window.onkeyup = function(e)
	{
		var code = e.keyCode ? e.keyCode : e.which;
		accionesTeclado(code, 2);
	};

	var accionesTeclado = function(code, tipo)
	{
		var ID = "";
		var clase = "";
		if(code >= 48 && code <= 57)
		{
			//Para los números...
			var numero = code - 48;
			ID = "numero_" + numero;
			clase = "presionado";
			if(tipo === 2)
			{
				capturaValor(String(numero), 1);
			}
		}
		else
		{
			//Para los operadores...
			if(code === 187 || code === 189 || code === 68 || code === 88)
			{
				for(var i = 1; i <= operaciones.length; i++)
				{
					if(operaciones[i - 1].code === code)
					{
						capturaValor(operaciones[i - 1].operador, 2);
						break;
					}
				}
			}
			else
			{
				//Los demás valores...
				switch(code)
				{
					case 27 	: capturaValor("", 3); 
								  break;
					case 191	:
					case 190 	: capturaValor("", 4); 
								  break;
					case 13 	: capturaValor("", 5); 
								  break;
				}
			}
		}
		if(ID !== "")
		{
			if(tipo === 1)
			{
				nom_div(ID).setAttribute("class", clase);
			}
			
			else
			{
				nom_div(ID).removeAttribute("class", "presionado");
			}
		}
	};
	//Fin de capturar el teclado...

	//Acceder a elementos del DOM...
	function nom_div(div)
	{
		return document.getElementById(div);
	}
};