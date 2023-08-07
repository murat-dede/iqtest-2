interface Question {
    question: string;
    answers: {
      [key: string]: {
        text?: string | null;
        color?: string | null;
        image?: string | null;
      };
    };
    image: string;
}
  
const questions =  [
    {
        "question": "Soldaki resimde hangi rengi görüyorsunuz ?",
        "answers": {
            "A": {
                "text": "Yeşil",
                "color": "green"
            },
            "B": {
                "text": "Kırmızı",
                "color": "red"
            },
            "C": {
                "text": "Sarı",
                "color": "yellow"
            },
            "D": {
                "text": "Mavi",
                "color": "blue"
            }
        },
        "image": "/static/images/questions/1.png"
    },
    {
        "question": "Soldaki resimde hangi rakamı görüyorsunuz ?",
        "answers": {
            "A": {
                "text": "sekiz",
                "color": "yellow"
            },
            "B": {
                "text": "bir",
                "color": "purple"
            },
            "C": {
                "text": "dört",
                "color": "green"
            },
            "D": {
                "text": "beş",
                "color": "red"
            }
        },
        "image": "/static/images/questions/2.png"
    },
    {
        "question": "Soldaki resimde soru işareti ile gösterilen yere ne gelmeli ?",
        "answers": {
            "A": {
                "text": null,
                "color": null,
                "image": "/static/images/answers/1-1.png"
            },
            "B": {
                "text": null,
                "color": null,
                "image": "/static/images/answers/1-2.png"
            },
            "C": {
                "text": null,
                "color": null,
                "image": "/static/images/answers/1-3.png"
            },
            "D": {
                "text": null,
                "color": null,
                "image": "/static/images/answers/1-4.png"
            }
        },
        "image": "/static/images/questions/3.png"
    },
    {
        "question": "Soldaki resimde soru işareti ile gösterilen yere ne gelmeli ?",
        "answers": {
            "A": {
                "text": "9"
            },
            "B": {"text": "16"},
            "C": {"text": "6"},
            "D": {"text": "90"}
        },
        "image": "/static/images/questions/4.png"
    },
    {
        "question": "Soldaki resimde soru işareti ile gösterilen yere ne gelmeli ?",
        "answers": {
            "A": {
                "text": null,
                "color": null,
                "image": "/static/images/answers/1.png"
            },
            "B": {
                "text": null,
                "color": null,
                "image": "/static/images/answers/2.png"
            },
            "C": {
                "text": null,
                "color": null,
                "image": "/static/images/answers/3.png"
            },
            "D": {
                "text": null,
                "color": null,
                "image": "/static/images/answers/4.png"
            }
        },
        "image": "/static/images/questions/5.png"
    },
    {
        "question": "Soldaki resimde soru işareti ile gösterilen yere ne gelmeli ?",
        "answers": {
            "A": {"text": "9"},
            "B": {"text": "4"},
            "C": {"text": "18"},
            "D": {"text": "11"}
        },
        "image": "/static/images/questions/6.png"
    },
    {
        "question": "Soldaki resimde soru işareti ile gösterilen yere ne gelmeli ?",
        "answers": {
            "A": {"text": "108"},
            "B": {"text": "123"},
            "C": {"text": "191"},
            "D": {"text": "112"}
        },
        "image": "/static/images/questions/7.png"
    },
    {
        "question": "Soldaki resimde solak olan hangisidir?",
        "answers": {
            "A": {
                "color": null,
                "image": null,
                "text": "1 numara"
            },
            
            "B": {
                "color": null,
                "image": null,
                "text": "2 numara"
            },
            "C": {
                "color": null,
                "image": null,
                "text": "3 numara"
            },
            "D": {
                "color": null,
                "image": null,
                "text": "4 numara"
            },
            "E": {
                "color": null,
                "image": null,
                "text": "5 numara"
            }

        },
        "image": "/static/images/questions/8.png"
    },
    {
        "question": "Soldaki resimde soru işareti ile gösterilen yere ne gelmeli ?",
        "answers": {
            "A": {"text": "30"},
            "B": {"text": "36"},
            "C": {"text": "42"},
            "D": {"text": "50"},
            "E": {"text": "58"}
        },
        "image": "/static/images/questions/9.png"
    },
    {
        "question": "Soldaki resimde soru işareti ile gösterilen yere ne gelmeli ?",
        "answers": {
            "A": {"text": "922"},
            "B": {"text": "233"},
            "C": {"text": "97"},
            "D": {"text": "13"},
            "E": {"text": "52"}
        },
        "image": "/static/images/questions/10.png"
    }
]

export default questions