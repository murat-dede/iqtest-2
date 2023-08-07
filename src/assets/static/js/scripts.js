// Questions

$(document).ready(function () {
    // Timer

    var timer = 0
    var duration = 5 * 60
    var interval;

    function startTimer() {
        interval = setInterval(updateTimer, 1000)
    }
    function updateTimer() {
        timer++;
        var remainingSeconds = duration - timer;
        if (remainingSeconds <= 0) {
            clearInterval(interval);
            $("#timer").text("Süre doldu!");
        } else {
            var minutes = Math.floor(remainingSeconds / 60);
            var seconds = remainingSeconds % 60;
            var formattedTime = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
            $("#timer").text(formattedTime);
        }
    }
    function timerExpired() {
        // İşlemleri burada tanımlayabilirsiniz
        alert("Süre doldu!");
        // Örneğin, başka bir fonksiyonu çağırabilir veya elementlerin stilini değiştirebilirsiniz
        // Örnek olarak:
        // $("#timer").css("color", "red");
    }
    $('#verifyModal').modal('show')
    $('#verifyButton').on('click', function () {
        verify = 'success'
        startTimer()
        $('#verifyModal').modal('hide')
        $.ajax({
            url: 'https://zekametre.com/sorular/allQuestion',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                var currentQuestionIndex = 0;
                var selectedAnswers = [];

                function showCurrentQuestion() {
                    var now_data = data[currentQuestionIndex]
                    $('#question').text(now_data['question'])
                    $('#question_img').attr('src', now_data.image)
                    $('#answers').empty();

                    Object.keys(now_data.answers).forEach(function (key) {
                        var item = now_data.answers[key]
                        if (item.color) {
                            var li = $('<li>').text(item.text).addClass('d-block').css('color', item.color).appendTo('#answers')
                        } else if (item.image) {
                            var li = $('<li>').addClass('d-block').appendTo('#answers');
                            $('<img>').attr('src', item.image).appendTo(li);

                        } else {
                            var li = $('<li>').text(item.text).addClass('d-block').appendTo('#answers')
                        }

                        // Selected Answers
                        li.on('click', function () {
                            var questionNumber = currentQuestionIndex + 1
                            var answerIndex = isAnswerSelected(questionNumber);

                            if (answerIndex === -1) {

                                var selecedAnswer = {
                                    questionNumber: questionNumber,
                                    chooice: key
                                }
                                $('#answers li i').removeClass('fas fa-check-circle');
                                li.append($('<i>').addClass('fas fa-check-circle').css('margin-left', '5px'))
                                selectedAnswers.push(selecedAnswer)
                            } else {
                                li.find('i').removeClass().addClass('fas fa-check-circle');
                                selectedAnswers[answerIndex].chooice = key
                            }
                        })
                    })
                }

                function isAnswerSelected(questionNumber) {
                    for (var i = 0; i < selectedAnswers.length; i++) {
                        if (selectedAnswers[i].questionNumber === questionNumber) {
                            return i;
                        }
                    }
                    return -1;
                }

                function showNextQuestion() {
                    currentQuestionIndex++;

                    if (currentQuestionIndex < data.length) {
                        showCurrentQuestion()
                    } else {
                        performFinalAction()
                        $('#nextButton').prop("disabled", true);
                    }
                }

                function showPreviousQuestion() {
                    currentQuestionIndex--;
                    if (currentQuestionIndex < data.length) {
                        showCurrentQuestion()
                    } else {
                        $('#previousButton').prop("disabled", true);

                    }
                }

                function performFinalAction() {
                    $('#myModal').modal('show')
                }

                // Get Payment Page
                $('#get_payment').on('click', function () {
                    selectedAnswers.push({product_name: 'test'})

                    fetch('https://zekametre.com/sorular/saveAnswer', {
                        method: 'POST',
                        body: JSON.stringify(selectedAnswers),
                    })
                    .then((result) => {
                        if (result.status === 200){
                            window.location.href ='https://zekametre.com/odeme';
                        }
                    })
                })

                $('#previousButton').on('click', showPreviousQuestion)
                $('#nextButton').on('click', showNextQuestion)

                showCurrentQuestion()
            },
            error: function () {
                console.log('error');
            }
        })
    })

})