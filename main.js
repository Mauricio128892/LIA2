document.addEventListener('DOMContentLoaded', () => {
    const gerberas = document.querySelectorAll('.gerbera');
    const contentContainer = document.getElementById('gerbera-content');
    let nivelActual = 1;

    // Objeto para almacenar las respuestas de la usuaria
    let userAnswers = {};

    const contenidos = [
        // Gerbera 1
        {
            title: "Gerbera 1: El Comienzo",
            html: `
                <div class="question-box">
                    <p>¿Qué fue lo que me enamoró de ti?</p>
                    <input type="text" id="respuesta1" placeholder="" style="width: 80%; padding: 10px;">
                </div>
                <button id="boton-gerbera1">¿Sabes qué es lo que me enamoró a mí?</button>
            `,
            finalMessage: (respuestaDeElla) => `
                <div class="question-box fade-in">
                    <p>Mi respuesta es: <strong>"Yo me empecé a enamorar cuando me dibujaste ese dibujo de Catriel y Paco".</strong></p>
                    <p>¡Pero tú, eso ya lo sabías! ¡Gracias por ser tan especial!</p>
                    <img src="images/foto1.png" alt="Foto especial" style="max-width: 100%; margin-top: 15px; border-radius: 8px;">
                </div>
                <button class="next-button" onclick="unlockNextGerbera()">Siguiente</button>
            `
        },
        // Gerbera 2
        {
            title: "Gerbera 2: El Primer Beso",
            html: `
                <div class="question-box">
                    <p>¿Dónde nos dimos nuestro primer beso?</p>
                    <div class="options-container">
                        <button class="option-button" data-value="cine">En el cine</button>
                        <button class="option-button" data-value="sillones">En unos sillones</button>
                        <button class="option-button" data-value="sillones_acostados">En unos sillones acostados</button>
                        <button class="option-button" data-value="campeche">En Campeche</button>
                    </div>
                </div>
                <button id="enviar-gerbera2" style="margin-top:20px; display:none;">Aquí fue donde nos dimos el primer beso</button>
            `,
            finalMessage: (respuestaDeElla) => `
                <div class="question-box fade-in">
                    <img id="gerbera-image" src="images/foto2.png" alt="Foto del primer beso">
                    <p style="margin-top: 10px;">El sentimiento más bonito que tengo es cuando te doy un beso. ¡Y nada de eso podrá cambiarlo!</p>
                </div>
                <button class="next-button" onclick="unlockNextGerbera()">Siguiente</button>
            `
        },
        // Gerbera 3
        {
            title: "Gerbera 3: Momentos Especiales",
            html: `
                <div class="question-box">
                    <p>Elige una foto que sea la que más te guste y explica el porqué.</p>
                    <p style="font-style: italic; margin-top: 10px;">
                        No hagas trampa y mándamela primero por WhatsApp para pasar a la cuarta Gerbera.
                    </p>
                </div>
                <button id="boton-gerbera3">Siguiente</button>
            `,
            finalMessage: (respuestaDeElla) => `
                <div class="question-box fade-in">
                    <p>Para mí, todas las fotos contigo son perfectas, ¡más porque sales tú y puedo admirar tu belleza! ¡Te quieroooooo!</p>
                    <img src="images/foto3.png" alt="Foto especial de momentos" style="max-width: 100%; margin-top: 15px; border-radius: 8px;">
                </div>
                <button class="next-button" onclick="unlockNextGerbera()">Siguiente</button>
            `
        },
        // Gerbera 4
        {
            title: "Gerbera 4: Los Pequeños Detallitos",
            html: `
                <div class="question-box">
                    <p>Rasca la tarjeta de abajo con tu dedo o cursor para descubrir un mensaje especial...</p>
                    <div id="rasca-gana" style="width:280px; height:140px; background-color:#ddd; border-radius:10px; display:flex; justify-content:center; align-items:center; cursor:pointer;">
                        <span style="color:transparent; font-weight:bold; transition:color 0.3s ease-in-out;">Rasca para ver mi mensaje...</span>
                    </div>
                </div>
            `,
            finalMessage: (respuestaDeElla) => `
                <div class="question-box fade-in">
                    <h3>¡Mensaje revelado!</h3>
                    <p>No son los grandes gestos, sino los pequeños momentos contigo los que me hacen feliz.</p>
                    <img src="images/foto4.png" alt="Foto especial de momentos" style="max-width: 100%; margin-top: 15px; border-radius: 8px;">
                </div>
                <button class="next-button" onclick="unlockNextGerbera()">Siguiente</button>
            `
        },
        // Gerbera 5
        {
            title: "Gerbera 5: Un Futuro Juntos",
            html: `
                <div class="question-box">
                    <p>Tus deseos son mis órdenes. Escribe un deseo para nuestro futuro juntos y hagámoslo realidad.</p>
                    <textarea id="respuesta5" rows="4" style="width: 80%; padding:10px;"></textarea>
                </div>
                <button id="boton-gerbera5">Enviar mi deseo</button>
            `,
            finalMessage: (respuestaDeElla) => `
                <div class="question-box fade-in">
                    <p>¡Gracias por compartir tus sueños conmigo! Tus deseos son ahora mis metas.</p>
                    <img src="images/foto5.png" alt="Foto especial de sueños" style="max-width: 100%; margin-top: 15px; border-radius: 8px;">
                </div>
                <button class="next-button" onclick="unlockNextGerbera()">Siguiente</button>
            `
        },
        // Gerbera 6
        {
            title: "Gerbera 6: La Celebración",
            html: `
                <div class="question-box fade-in">
                    <h2 style="color: #e91e63; font-weight: bold;">¡Seis meses y contando!</h2>
                    <p>
                        Estos seis meses contigo estoy muy agradecido de que me hayas dejado entrar a tu vida. Eres la princesa más hermosa del mundo. Hemos vivido de todo en estos seis meses y, aunque no nos vemos taaaan a menudo, con el poco tiempo que te veo me recuerdas el porqué sigo enamorado. Este será el último mes en el cual seremos enamorados, pero eso es una sorpresa ¡QUE NO TE PUEDO DECIR! ¡TE QUIERO MUCHOOOOOOO!
                    </p>
                    <img src="images/foto6.png" alt="Foto especial de celebración" style="max-width: 100%; margin-top: 15px; border-radius: 8px;">
                </div>
                <button class="next-button" id="copy-answers-button" onclick="copyAnswersToClipboard()">Copiar respuestas</button>
                <p style="margin-top: 10px; font-style: italic; color: #666;">Ahora no tengas pena y mándame las respuestas. ¡O si no, te hago pipí! 😉</p>
                <span id="copy-confirmation" style="display:none; color: green; font-weight: bold; margin-top: 10px;">¡Copiado al portapapeles!</span>
            `,
            finalMessage: '' // Esta es la última, no hay siguiente mensaje.
        }
    ];

    const mostrarGerbera = (nivel) => {
        const contenido = contenidos [nivel - 1];
        
        // Limpia el contenedor y añade el título y el cuerpo
        contentContainer.innerHTML = `
            <div class="title-box">${contenido.title}</div>
            <div id="gerbera-body">${contenido.html}</div>
        `;

        // Aplica la animación fade-in al contenido recién inyectado
        const gerberaBody = document.getElementById('gerbera-body');
        if (gerberaBody) {
            gerberaBody.classList.add('fade-in');
        }

        // Si la gerbera actual es la 1, adjunta el evento al botón de revelar
        if (nivel === 1) {
            document.getElementById('boton-gerbera1').addEventListener('click', () => {
                const respuestaInput = document.getElementById('respuesta1');
                const respuesta = respuestaInput.value.trim(); // .trim() para quitar espacios en blanco al inicio/final

                if (respuesta === '') { // Si la respuesta está vacía
                    alert("¡Por favor, escribe algo para continuar! 😉"); // Mensaje para que escriba
                    respuestaInput.focus(); // Pone el foco de nuevo en el input
                    return; // Detiene la ejecución para no avanzar
                }

                userAnswers['Gerbera 1 - Lo que te enamoró'] = respuesta; // Guarda la respuesta limpia
                
                // Reemplaza solo el contenido del cuerpo con el mensaje final y aplica fade-in
                if (gerberaBody) {
                    gerberaBody.classList.remove('fade-in'); // Elimina la animación anterior si existe
                    gerberaBody.innerHTML = contenido.finalMessage(respuesta);
                    gerberaBody.classList.add('fade-in'); // Aplica la animación al nuevo contenido
                }
            });
        } else if (nivel === 2) {
            const opciones = document.querySelectorAll('.option-button');
            const botonEnviar = document.getElementById('enviar-gerbera2');
            let respuestaCorrectaSeleccionada = false;
            let respuestaSeleccionadaTexto = '';

            opciones.forEach(opcion => {
                opcion.addEventListener('click', () => {
                    opciones.forEach(o => o.classList.remove('selected'));
                    opcion.classList.add('selected');
                    botonEnviar.style.display = 'block';
                    respuestaSeleccionadaTexto = opcion.innerText;
                    if (opcion.dataset.value === 'cine') {
                        respuestaCorrectaSeleccionada = true;
                    } else {
                        respuestaCorrectaSeleccionada = false;
                    }
                });
            });

            botonEnviar.addEventListener('click', () => {
                if (!respuestaSeleccionadaTexto) { // Obliga a seleccionar una opción
                    alert("¡Por favor, selecciona una opción para continuar!");
                    return;
                }
                if (respuestaCorrectaSeleccionada) {
                    userAnswers['Gerbera 2 - Primer Beso'] = respuestaSeleccionadaTexto;
                    const gerberaBody = document.getElementById('gerbera-body');
                    if (gerberaBody) {
                        gerberaBody.classList.remove('fade-in');
                        gerberaBody.innerHTML = contenido.finalMessage(respuestaSeleccionadaTexto);
                        gerberaBody.classList.add('fade-in');
                    }
                } else {
                    alert("Esa no es la respuesta correcta. ¡Intenta de nuevo!");
                }
            });
        } else if (nivel === 3) {
            document.getElementById('boton-gerbera3').addEventListener('click', () => {
                userAnswers['Gerbera 3 - Foto compartida'] = 'Confirmó haber compartido la foto por WhatsApp';
                const gerberaBody = document.getElementById('gerbera-body');
                if (gerberaBody) {
                    gerberaBody.classList.remove('fade-in');
                    gerberaBody.innerHTML = contenido.finalMessage();
                    gerberaBody.classList.add('fade-in');
                }
            });
        } else if (nivel === 4) {
            const rascaGana = document.getElementById('rasca-gana');
            // Adjunta el evento solo si el elemento existe
            if (rascaGana) {
                let hasBeenScratched = false; // Bandera para saber si ya se rascó

                rascaGana.addEventListener('mouseover', () => {
                    if (!hasBeenScratched) {
                        rascaGana.querySelector('span').style.color = 'black';
                        setTimeout(() => {
                            userAnswers['Gerbera 4 - Mensaje revelado'] = 'Mensaje de "Rasca y Gana" leído';
                            const gerberaBody = document.getElementById('gerbera-body');
                            if (gerberaBody) {
                                gerberaBody.classList.remove('fade-in');
                                gerberaBody.innerHTML = contenido.finalMessage();
                                gerberaBody.classList.add('fade-in');
                            }
                            hasBeenScratched = true; // Marca como rascado
                        }, 1000);
                    }
                });
            }
        } else if (nivel === 5) {
            document.getElementById('boton-gerbera5').addEventListener('click', () => {
                const deseoInput = document.getElementById('respuesta5');
                const deseo = deseoInput.value.trim();

                if (deseo === '') {
                    alert("¡Por favor, escribe tu deseo para el futuro!");
                    deseoInput.focus();
                    return;
                }

                userAnswers['Gerbera 5 - Deseo para el futuro'] = deseo;
                const gerberaBody = document.getElementById('gerbera-body');
                if (gerberaBody) {
                    gerberaBody.classList.remove('fade-in');
                    gerberaBody.innerHTML = contenido.finalMessage(deseo);
                    gerberaBody.classList.add('fade-in');
                }
            });
        } else if (nivel === 6) {
            // Contenido final de la gerbera 6, no hay interacción de respuesta.
            // Asegura que el botón de copiar y el mensaje divertido estén adjuntos sus eventos si es necesario
            // (Ya están adjuntos globalmente, pero si estuvieran aquí se verificaría)
        }
    };

    const unlockNextGerbera = () => {
        if (nivelActual < 6) {
            nivelActual++;
            const proximaGerbera = document.querySelector(`[data-gerbera='${nivelActual}']`);
            proximaGerbera.classList.remove('locked');
            mostrarGerbera(nivelActual);
        } else if (nivelActual === 6) {
            // Si ya estamos en la gerbera 6, no desbloqueamos nada más
            // Solo aseguramos que el contenido final se muestre con su botón
            mostrarGerbera(nivelActual); 
        }
    };

    // Función para copiar el resumen al portapapeles
    window.copyAnswersToClipboard = () => {
        let summaryText = "💖 ¡Hola! Completé tu reto de las Gerberas. Aquí un resumen de mis respuestas:\n\n";
        
        for (const [key, value] of Object.entries(userAnswers)) {
            summaryText += `* ${key}: ${value}\n`;
        }

        // Nuevo mensaje al final
        summaryText += "\nEres el papacito chulo más mamado e increíblemente guapo con el que he estado, ¡y estoy obsesionada contigo! 😍";
        summaryText += "\n\n¡Te quiero mucho! 🥰"; // El mensaje de cariño final

        // Usar la API de Clipboard
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(summaryText)
                .then(() => {
                    const confirmationSpan = document.getElementById('copy-confirmation');
                    if (confirmationSpan) {
                        confirmationSpan.style.display = 'inline';
                        setTimeout(() => {
                            confirmationSpan.style.display = 'none';
                        }, 3000); // Ocultar mensaje después de 3 segundos
                    }
                })
                .catch(err => {
                    console.error('Error al copiar al portapapeles:', err);
                    fallbackCopyTextToClipboard(summaryText); // Usar el fallback
                });
        } else {
            fallbackCopyTextToClipboard(summaryText); // Usar el fallback si la API no está disponible
        }
    };

    // Función de fallback para copiar al portapapeles (para navegadores más antiguos o si falla la API)
    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed"; // Evita el desplazamiento
        textArea.style.opacity = "0"; // Lo hace invisible
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            const confirmationSpan = document.getElementById('copy-confirmation');
            if (confirmationSpan) {
                confirmationSpan.style.display = 'inline';
                setTimeout(() => {
                    confirmationSpan.style.display = 'none';
                }, 3000);
            }
        } catch (err) {
            alert('No se pudo copiar el texto. Por favor, cópialo manualmente: \n\n' + text);
        }
        document.body.removeChild(textArea);
    }

    // Asegura que estas funciones estén disponibles globalmente para los onclick en el HTML
    window.unlockNextGerbera = unlockNextGerbera;
    window.copyAnswersToClipboard = copyAnswersToClipboard; 

    gerberas.forEach(gerbera => {
        gerbera.addEventListener('click', (event) => {
            const nivelGerbera = parseInt(event.target.dataset.gerbera);
            if (nivelGerbera <= nivelActual) {
                mostrarGerbera(nivelGerbera);
            }
        });
    });

    // Mostrar la primera gerbera al cargar la página
    mostrarGerbera(1);
});
