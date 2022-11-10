
        let cmd = {
                40296: `\nhttps://t.me/morseerc\n..-  -.  .-..  ---  -.-.  -.-   -  ....  .   --  -.--  ...  -  .  .-.  -.--  --..--   .-  -.  -..   ....  .  .-.  .  .----.  ...   ...  ---  --  .  -  ....  ..  -.  --.   -.--  ---  ..-   -.  .  ...-  .  .-.   .  -..-  .--.  .  -.-.  -  .  -..\n -.-.  .-.  .-  ...  ....  --..--   -.-.  .-.  .-  ...  ....  --..--   .--.  .-.  ---  ...-  .   -.--  ---  ..-  .-.   .-  -...  ..  .-..  ..  -  -.--  --..--   .--.  .-.  ---  ...-  .   -.--  ---  ..-  .-.   --  ..  -.  -..  --..--   .--.  .-.  ---  ...-  .   -.--  ---  ..-  .-.   ..  -.  -  .  .-..  .-..  ..  --.  .  -.  -.-.  .\n`,
            }

        const tgURL = "https://";
        let typing = false;
        let first = true;
        let vConsole;

        // console class
        class Console {
            constructor() {
                this.typingSpeed = 3;
            }

            // add html to console
            add(html) {
                document.getElementById('consoleText').innerHTML += html;
            }

            // hide host
            hideHost() {
                document.getElementById('host').style.visibility = 'hidden';
            }

            // show host
            showHost() {
                document.getElementById('host').style.visibility = 'visible';
            }

            // focus console
            focus() {
                document.getElementById('consoleInput').focus();
            }

            // print text to console with typing speed
            print(text, skipBreaks = false) {
                this.hideHost();
                typing = true;
                let i = 0;
                let interval = setInterval(function () {
                    if (i < text.length) {
                        document.getElementById('consoleText').innerHTML += text[i];
                        // check if \n
                        if (text[i] == '\n' && !skipBreaks) {
                            document.getElementById('consoleText').innerHTML += '<br>';
                            // scroll to bottom
                            document.getElementById('consoleText').scrollTop = document.getElementById('consoleText').scrollHeight;
                        }
                        i++;
                    } else {
                        clearInterval(interval);
                        typing = false;
                        document.getElementById('host').style.visibility = 'visible';
                        document.getElementById('consoleInput').focus();
                        // scroll to bottom
                        document.getElementById('consoleText').scrollTop = document.getElementById('consoleText').scrollHeight;
                    }
                }, this.typingSpeed);
            }

            // welcome message
            welcome() {
                this.print(` \n\n.-  .-..  .-..   ...  .  -.-.  .-.  .  -  ...   --  ..-  ...  -   -.  ---  -   -...  .   ---  -...  ...-  ..  ---  ..-  ...  --..--   ---  .-.   -  ....  .  -.--   .-..  ---  ...  .   -  ....  .  ..  .-.   ...-  .-  .-..  ..-  .\n-  ....  .-.  .  .   .-  .-.  .-.  ---  .--  ...   -.-.  .-  .--.  ..  -  .-  .-..   -..  ..-  .   -  ---   -  ....  .  ..  .-.   .-..  ---  ...  ...   ---  ..-.   -.-.  ---  -.  ..-.  ..  -..  .  -.\n -.-.  .   .-  -.  -..   .-  -...  ..  .-..  ..  -  -.--   -  ---   -..  ..  ...  .-  .--.  .--.  .  .-  .-.   ..-.  ---  .-.   ....  ---  .--   .-..  ---  -.  --.\n . -. - . .-. / - .... . / -.-. --- -.. .\n\n`);
            }

            // reboot
            reboot() {
                inQuiz = false;
                // disable input
                document.getElementById('consoleInput').disabled = true;
                // hide host
                this.hideHost();
                this.add(`<span id="rb">Rebooting in 3.. </span>`);
                let i = 2;
                let interval = setInterval(function () {
                    if (i > 0) {
                        document.getElementById('rb').innerHTML = `Rebooting in ${i}.. `;
                        i--;
                    } else {
                        clearInterval(interval);
                        // reinit console
                        document.getElementById('consoleText').innerHTML = '';
                        first = true;
                        typing = false;
                        document.getElementById('host').style.visibility = 'visible';
                        document.getElementById('consoleInput').disabled = false;
                        document.getElementById('consoleInput').focus();
                        vConsole.welcome();
                    }
                }, 1000)
            }

            // handle inputs
            handleInput(input) {
                if (typing) {
                    return;
                }
                // add host to console
                if (!first) this.add('<span><br></span>');
                first = false;
                this.add(`${document.getElementById('host').children[0].innerHTML}<span>${input}</span><br>`);
                // input up to first space
                let newIn = input.split(' ')[0];
                if (cmd[newIn]) {
                    if (typeof cmd[input] == 'string') {
                        this.print(cmd[newIn]);
                    } 
                    else {
                        // call function from console
                        if (cmd[newIn] == 1) {
                            this.reboot();
                        }
                    }
                    this.hideHost();
                    document.getElementById('host').style.display = 'none';
                    console.log("wowow!!!");
                } else {
                    this.print('.-. . - .-. -.--\n');
                }

            }

        }

        let inQuiz = false;
        let stage = 0;
        let selectAll = false;

        // create new console
        vConsole = new Console();

        vConsole.welcome();

        // on mouse click, focus console
        document.addEventListener('click', function () {
            vConsole.focus();
        });

        // initial focus
        $(document).ready(function () {
            // for ios
            setTimeout($('#consoleInput').focus(), 0);

        });

        // listen for keypresses
        document.addEventListener('keydown', function (e) {
            // if ctrl
            if (e.ctrlKey) {
                // check for ctrl a
                if (e.keyCode == 65) {
                    selectAll = true;
                }
                return;
            }
            // if console is currently typing, ignore keypress
            if (typing) {
                return;
            }
            e.preventDefault();
            if (!e.key) return;

            // enter
            if (e.key.toLowerCase() == 'enter') {

                if (inQuiz) {
                    handleQuiz();
                    return;
                }


                // get input
                let input = document.getElementById('consoleInput').value;
                // clear input
                document.getElementById('consoleInput').value = '';
                // if input is empty, ignore
                if (input == '') return;
                // check if quiz
                if (input.toLowerCase() == 'quiz') {
                    quiz();
                    return;
                }
                
                vConsole.handleInput(input);
            } else if (e.key.toLowerCase() == 'backspace') {
                // get input
                let input = document.getElementById('consoleInput').value;
                if (selectAll) {
                    input = '';
                    selectAll = false;
                } else {
                    // take last character
                    input = input.substring(0, input.length - 1);
                }
                // set input
                document.getElementById('consoleInput').value = input;
            } else {
                // check if shift or caps 
                let key = (e.shiftKey ^ e.getModifierState('CapsLock')) ? e.key.toUpperCase() : e.key.toLowerCase();
                if (e.key.length !== 1) return;

                // get input
                let input = document.getElementById('consoleInput').value;
                // add input
                input += key;
                // set input
                document.getElementById('consoleInput').value = input;
            }
        });

        function updateTimer() {
            let end = new Date(1658587500000);
            let now = new Date();
            let diff = end - now;
            if (diff < 0) {
                document.getElementById('timer').innerHTML = '';
            } else {
                let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((diff % (1000 * 60)) / 1000);
                // update elemernts
                document.getElementById('t-hours').innerHTML = (hours < 10) ? '0' + hours : hours;
                document.getElementById('t-minutes').innerHTML = (minutes < 10) ? '0' + minutes : minutes;
                document.getElementById('t-seconds').innerHTML = (seconds < 10) ? '0' + seconds : seconds;
            }
        }

        setInterval(() => {
            updateTimer();
        }, 10);
        updateTimer();
   