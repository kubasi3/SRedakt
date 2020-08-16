'use strict'

let Data;

Data = function() {
    let item;
    let func;
    let controler;
    let properitiesFunc;
    let formElements = [];
    let temp;
    
    item = {
        body : {
            items : {
                text : 'Stránka',
                body : {
                    way1 : 'body',
                    way2 : 'body',
                    text : 'Stránka',
                    dom : 'div',
                    navBar : [['default'], ['text'], ['navAlert'], ['interactive'], ['editable']],
                    selfBar : false,
                    defItem : {
                        properities : {}
                    }
                }
            }
        },
        default : {
            text : 'Základní',
            items : {
                row : {
                    way1 : 'default',
                    way2 : 'row',
                    text : 'Řádek',
                    dom : 'div',
                    navBar : [['default', 'col',]],
                    selfBar : {
                        properities : {
                            background : {
                                func : 'select',
                                text : 'Pozadí',
                                name : 'background',
                                data : [
                                    {text : 'Základní', value : 'bg-primary'},
                                    {text : 'Potvrzení', value : 'bg-success'},
                                    {text : 'Informace', value : 'bg-info'},
                                    {text : 'Varování', value : 'bg-warning'},
                                    {text : 'Nebezpečí', value : 'bg-danger'},
                                    {text : 'Šedý', value : 'bg-secondary'},
                                    {text : 'Tmavý', value : 'bg-dark'},
                                    {text : 'Světlý', value : 'bg-light'},
                                    {text : 'Žádné', value : ''}
                                ]
                            }
                        }
                    },
                    defItem : {
                        properities : {
                            class : 'row'
                        }
                    }
                },
                col : {
                    way1 : 'default',
                    way2 : 'col',
                    text : 'Sloupec',
                    dom : 'div',
                    navBar : [['default', 'row', 'cont'], ['text'], ['navAlert'], ['interactive'], ['editable']],
                    selfBar : {
                        properities : {
                            zarovnání : {
                                func : 'select',
                                text : 'Zarovnání',
                                name : 'display',
                                data : [
                                    {text : 'Vlevo', value : 'd-flex justify-content-start'},
                                    {text : 'Vpravo', value : 'd-flex justify-content-end'},
                                    {text : 'Střed', value : 'd-flex justify-content-center'},
                                    {text : 'Rozložení do krajů', value : 'd-flex justify-content-between'},
                                    {text : 'Rovnoměrné rozložení', value : 'd-flex justify-content-around'}
                                ]
                            },
                            background : {
                                func : 'select',
                                text : 'Pozadí',
                                name : 'background',
                                data : [
                                    {text : 'Základní', value : 'bg-primary'},
                                    {text : 'Potvrzení', value : 'bg-success'},
                                    {text : 'Informace', value : 'bg-info'},
                                    {text : 'Varování', value : 'bg-warning'},
                                    {text : 'Nebezpečí', value : 'bg-danger'},
                                    {text : 'Šedý', value : 'bg-secondary'},
                                    {text : 'Tmavý', value : 'bg-dark'},
                                    {text : 'Světlý', value : 'bg-light'},
                                    {text : 'Žádné', value : ''}
                                ]
                            }
                            ,
                            width : {
                                func : 'select',
                                text : 'Šířka',
                                name : 'width',
                                data : [
                                    {text : '1', value : 'col-1'},
                                    {text : '2', value : 'col-2'},
                                    {text : '3', value : 'col-3'},
                                    {text : '4', value : 'col-4'},
                                    {text : '5', value : 'col-5'},
                                    {text : '6', value : 'col-6'},
                                    {text : '7', value : 'col-7'},
                                    {text : '8', value : 'col-8'},
                                    {text : '9', value : 'col-9'},
                                    {text : '1', value : 'col-10'},
                                    {text : '1', value : 'col-11'},
                                    {text : '1', value : 'col-12'}
                                ]
                            }
                        }
                    },
                    defItem : {
                        properities : {
                            class : 'col'
                        }
                    }
                },
                cont : {
                    way1 : 'default',
                    way2 : 'cont',
                    text : 'Kontejner',
                    dom : 'div',
                    navBar : [['default', 'col', 'row'], ['text'], ['navAlert'], ['interactive'], ['editable']],
                    selfBar : {
                        properities : {
                            select : {
                                func : 'select',
                                text : 'Šířka',
                                name : 'width',
                                data : [
                                    {text : 'Malá', value : 'container'},
                                    {text : 'Maximální', value : 'container-fluid'}
                                ]
                            }, 
                            paddingMargin : {
                                func : 'multiSelect',
                                text : 'Odsazení',
                                name : 'pm',
                                value : '',
                                data : [
                                    {
                                        text : 'strana', 
                                        data : [
                                            {text : 'Vnější', value : 'm', name : 'm'},
                                            {text : 'vnitřní', value : 'p', name : 'p'},

                                        ]
                                    },
                                    {
                                        text : 'okraj', 
                                        data : [
                                            {text : 'Všechny', value : ''},
                                            {text : 'Pravá', value : 'r', name : 'r'},
                                            {text : 'Levá', value : 'l', name : 'l'},
                                            {text : 'Horní', value : 't', name : 't'},
                                            {text : 'Dolní', value : 'b', name : 'b'}
                                        ]
                                    },
                                    {
                                        text : 'velikost', 
                                        data : [
                                            {text : 'Žádné', value : '-0'},
                                            {text : 'Velmi malé', value : '-1'},
                                            {text : 'Malé', value : '-2'},
                                            {text : 'Střední', value : '-3'},
                                            {text : 'Velké', value : '-4'},
                                            {text : 'Velmi velké', value : '-5'},
                                            {text : 'Automatické', value : 'auto'}
                                        ]
                                    }
                                ]
                            },
                            background : {
                                func : 'select',
                                text : 'Pozadí',
                                name : 'background',
                                data : [
                                    {text : 'Základní', value : 'bg-primary'},
                                    {text : 'Potvrzení', value : 'bg-success'},
                                    {text : 'Informace', value : 'bg-info'},
                                    {text : 'Varování', value : 'bg-warning'},
                                    {text : 'Nebezpečí', value : 'bg-danger'},
                                    {text : 'Šedý', value : 'bg-secondary'},
                                    {text : 'Tmavý', value : 'bg-dark'},
                                    {text : 'Světlý', value : 'bg-light'},
                                    {text : 'Žádné', value : ''}
                                ]
                            },
                            textColor : {
                                func : 'select',
                                text : 'Barva textu',
                                name : 'textColor',
                                data : [
                                    {text : 'Zeslabený', value : 'text-muted'},
                                    {text : 'Základní', value : 'text-primary'},
                                    {text : 'Potvrzení', value : 'text-success'},
                                    {text : 'Informace', value : 'text-info'},
                                    {text : 'Varování', value : 'text-warning'},
                                    {text : 'Nebezpečí', value : 'text-danger'},
                                    {text : 'Šedý', value : 'text-secondary'},
                                    {text : 'Tmavý', value : 'text-dark'},
                                    {text : 'Světlý', value : 'text-light'},
                                    {text : 'Bílý', value : 'text-light'},
                                    {text : 'Černý', value : 'text-body'},
                                    {text : 'Automaticky', value : 'text-body'}
                                ]
                            },
                            zarovnání : {
                                func : 'select',
                                text : 'Zarovnání',
                                name : 'display',
                                data : [
                                    {text : 'Vlevo', value : 'd-flex justify-content-start'},
                                    {text : 'Vpravo', value : 'd-flex justify-content-end'},
                                    {text : 'Střed', value : 'd-flex justify-content-center'},
                                    {text : 'Rozložení do krajů', value : 'd-flex justify-content-between'},
                                    {text : 'Rovnoměrné rozložení', value : 'd-flex justify-content-around'}
                                ]
                            },
                            borderR : {
                                func : 'select',
                                text : 'Zakulacení rohů',
                                name : 'borderR',
                                data : [
                                    {text : 'žádné', value : 'rounded-0'},
                                    {text : 'Malé', value : 'rounded-sm'},
                                    {text : 'Střední', value : 'rounded'},
                                    {text : 'Velké', value : 'rounded-lg'},
                                    {text : 'Úplné', value : 'rounded-circle'},
                                    {text : 'Vpravo', value : 'rounded-right'},
                                    {text : 'Vlevo', value : 'rounded-left'},
                                    {text : 'Nahoře', value : 'rounded-top'},
                                    {text : 'Dole', value : 'rounded-bottom'}
                                ]
                            },
                            borderColor : {
                                func : 'select',
                                text : 'Barva ohraničení',
                                name : 'borderColor',
                                data : [
                                    {text : 'Zeslabený', value : 'border-muted'},
                                    {text : 'Základní', value : 'border-primary'},
                                    {text : 'Potvrzení', value : 'border-success'},
                                    {text : 'Informace', value : 'border-info'},
                                    {text : 'Varování', value : 'border-warning'},
                                    {text : 'Nebezpečí', value : 'border-danger'},
                                    {text : 'Šedý', value : 'border-secondary'},
                                    {text : 'Tmavý', value : 'border-dark'},
                                    {text : 'Světlý', value : 'border-light'},
                                    {text : 'Bílý', value : 'border-light'},
                                    {text : 'Černý', value : 'border-body'},
                                    {text : 'Automaticky', value : 'border-body'}
                                ]
                            },
                            border : {
                                func : 'button',
                                text : 'Ohraničení',
                                name : 'border',
                                value : 'border'
                            }
                        }
                    },
                    defItem : {
                        properities : {
                            class : 'container'
                        }
                    }
                }
            }
        },
        text : {
            text : 'Text',
            items : {
                h1 : {
                    way1 : 'text',
                    way2 : 'h1',
                    text : 'Nadpis 1',
                    dom : 'h1',
                    navBar : [['text', 'span2'], ['editable']],
                    selfBar : {
                        properities : {
                            textColor : {
                                func : 'select',
                                text : 'Barva textu',
                                name : 'textColor',
                                data : [
                                    {text : 'Zeslabený', value : 'text-muted'},
                                    {text : 'Základní', value : 'text-primary'},
                                    {text : 'Potvrzení', value : 'text-success'},
                                    {text : 'Informace', value : 'text-info'},
                                    {text : 'Varování', value : 'text-warning'},
                                    {text : 'Nebezpečí', value : 'text-danger'},
                                    {text : 'Šedý', value : 'text-secondary'},
                                    {text : 'Tmavý', value : 'text-dark'},
                                    {text : 'Světlý', value : 'text-light'},
                                    {text : 'Bílý', value : 'text-light'},
                                    {text : 'Černý', value : 'text-body'},
                                    {text : 'Automaticky', value : 'text-body'}
                                ]
                            },
                            textStyle1 : {
                                func : 'select',
                                text : 'Styl textu1',
                                name : 'textStyle1',
                                data : [
                                    {text : 'Tučný', value : 'font-weight-bold'},
                                    {text : 'Slabý', value : 'font-weight-light'},
                                    {text : 'Italic', value : 'font-italic'},
                                    {text : 'Žádný', value : ''}
                                ]
                            },
                            textStyle2 : {
                                func : 'select',
                                text : 'Styl textu2',
                                name : 'textStyle2',
                                data : [
                                    {text : 'Tučný', value : 'font-weight-bold'},
                                    {text : 'Slabý', value : 'font-weight-light'},
                                    {text : 'Italic', value : 'font-italic'},
                                    {text : 'Žádný', value : ''}
                                ]
                            },
                            textSide : {
                                func : 'select',
                                text : 'Zarovnání textu',
                                name : 'textSide',
                                data : [
                                    {text : 'Vlevo', value : 'text-left'},
                                    {text : 'Vpravo', value : 'text-right'},
                                    {text : 'Střed', value : 'text-center'},
                                    {text : 'Blok', value : 'text-justify'}
                                ]
                            }
                        }
                    },
                    defItem : {
                        properities : {
                        }
                    }
                },
                p : {
                    way1 : 'text',
                    way2 : 'p',
                    text : 'Textový odstavec',
                    dom : 'p',
                    navBar : [['text', 'span2'], ['editable']],
                    selfBar : {
                        properities : {
                            textColor : {
                                func : 'select',
                                text : 'Barva textu',
                                name : 'textColor',
                                data : [
                                    {text : 'Zeslabený', value : 'text-muted'},
                                    {text : 'Základní', value : 'text-primary'},
                                    {text : 'Potvrzení', value : 'text-success'},
                                    {text : 'Informace', value : 'text-info'},
                                    {text : 'Varování', value : 'text-warning'},
                                    {text : 'Nebezpečí', value : 'text-danger'},
                                    {text : 'Šedý', value : 'text-secondary'},
                                    {text : 'Tmavý', value : 'text-dark'},
                                    {text : 'Světlý', value : 'text-light'},
                                    {text : 'Bílý', value : 'text-light'},
                                    {text : 'Černý', value : 'text-body'},
                                    {text : 'Automaticky', value : 'text-body'}
                                ]
                            },
                            textStyle1 : {
                                func : 'select',
                                text : 'Styl textu1',
                                name : 'textStyle1',
                                data : [
                                    {text : 'Tučný', value : 'font-weight-bold'},
                                    {text : 'Slabý', value : 'font-weight-light'},
                                    {text : 'Italic', value : 'font-italic'},
                                    {text : 'Žádný', value : ''}
                                ]
                            },
                            textStyle2 : {
                                func : 'select',
                                text : 'Styl textu2',
                                name : 'textStyle2',
                                data : [
                                    {text : 'Tučný', value : 'font-weight-bold'},
                                    {text : 'Slabý', value : 'font-weight-light'},
                                    {text : 'Italic', value : 'font-italic'},
                                    {text : 'Žádný', value : ''}
                                ]
                            },
                            textSide : {
                                func : 'select',
                                text : 'Zarovnání textu',
                                name : 'textSide',
                                data : [
                                    {text : 'Vlevo', value : 'text-left'},
                                    {text : 'Vpravo', value : 'text-right'},
                                    {text : 'Střed', value : 'text-center'},
                                    {text : 'Blok', value : ''}
                                ]
                            }
                        }
                    },
                    defItem : {
                        properities : {
                            
                        }
                    }
                },
                span : {
                    way1 : 'text',
                    way2 : 'span',
                    text : 'Formátovaný text',
                    dom : 'span',
                    navBar : [],
                    selfBar : {
                        properities : {
                            textEditor : {
                                func : 'textEditor',
                                text : 'Textový editor',
                                menu : {
                                    select : {
                                        func : 'select',
                                        text : 'Nadpisy',
                                        name : 'Type',
                                        data : [
                                            {text : 'Nadpis1', value : 'FBh1'},
                                            {text : 'Nadpis2', value : 'FBh2'},
                                            {text : 'Nadpis3', value : 'FBh3'},
                                            {text : 'Nadpis4', value : 'FBh4'},
                                            {text : 'Nadpis5', value : 'FBh5'},
                                            {text : 'Nadpis6', value : 'FBh6'},
                                            {text : 'Odstavec', value : 'FBp'},
                                            {text : 'Bez stylu', value : 'FBdiv'}
                                        ]
                                    },
                                    select2 : {
                                        func : 'select',
                                        text : 'Styl',
                                        name : 'Type',
                                        data : [
                                            {text : '<b>tučně</b>', value : 'bold'}
                                        ]
                                    }
                                }
                            }
                        }
                    },
                    defItem : {
                        text : 'Formátovaný text',
                        properities : {
                        }
                    }
                },
                span2 : {
                    way1 : 'text',
                    way2 : 'span2',
                    text : 'Text',
                    dom : 'span',
                    navBar : [],
                    selfBar : {
                        properities : {
                            textEditor : {
                                func : 'textEditor',
                                text : 'Textový editor',
                                unstyl : true
                            }
                        }
                    },
                    defItem : {
                        text : 'Text',
                        properities : {
                        }
                    }
                },
                a : {
                    way1 : 'text',
                    way2 : 'a',
                    text : 'Odkaz',
                    dom : 'a',
                    navBar : [['text'], ['interactive'], ['editable']],
                    selfBar : {
                        properities : {
                            href : {
                                func : 'href',
                                text : 'Odkaz',
                                name : 'href',
                                data : [
                                    {text : 'Cizí odkaz', fce : 'input'},
                                    {text : 'Vybrat ze stránek', fce : 'self'}
                                ],
                            },
                            target : {
                                func : 'select',
                                text : 'Otevření odkazu',
                                name : 'target',
                                special : true,
                                data : [
                                    {text : 'Toto okno', value : '_self'},
                                    {text : 'Nové okno', value : '_blank'},
                                ]
                            }
                        }
                    },
                    defItem : {
                        properities : {
                        }
                    }
                }
            },
        },
        interactive : {
            text : 'Interaktivní',
            items : {
                button : {
                    way1 : 'interactive',
                    way2 : 'button',
                    text : 'Tlačítko',
                    dom : 'button',
                    navBar : [['text', 'span2'], ['interactive'], ['editable']],
                    selfBar : {
                        properities : {
                            textColor : {
                                func : 'select',
                                text : 'Barva textu',
                                name : 'textColor',
                                data : [
                                    {text : 'Zeslabený', value : 'text-muted'},
                                    {text : 'Základní', value : 'text-primary'},
                                    {text : 'Potvrzení', value : 'text-success'},
                                    {text : 'Informace', value : 'text-info'},
                                    {text : 'Varování', value : 'text-warning'},
                                    {text : 'Nebezpečí', value : 'text-danger'},
                                    {text : 'Šedý', value : 'text-secondary'},
                                    {text : 'Tmavý', value : 'text-dark'},
                                    {text : 'Světlý', value : 'text-light'},
                                    {text : 'Bílý', value : 'text-light'},
                                    {text : 'Černý', value : 'text-body'},
                                    {text : 'Automaticky', value : ''}
                                ]
                            },
                            textStyle1 : {
                                func : 'select',
                                text : 'Styl textu1',
                                name : 'textStyle1',
                                data : [
                                    {text : 'Tučný', value : 'font-weight-bold'},
                                    {text : 'Slabý', value : 'font-weight-light'},
                                    {text : 'Italic', value : 'font-italic'},
                                    {text : 'Žádný', value : ''}
                                ]
                            },
                            textStyle2 : {
                                func : 'select',
                                text : 'Styl textu2',
                                name : 'textStyle2',
                                data : [
                                    {text : 'Tučný', value : 'font-weight-bold'},
                                    {text : 'Slabý', value : 'font-weight-light'},
                                    {text : 'Italic', value : 'font-italic'},
                                    {text : 'Žádný', value : ''}
                                ]
                            },
                            paddingMargin : {
                                func : 'multiSelect',
                                text : 'Odsazení',
                                name : 'pm',
                                value : '',
                                data : [
                                    {
                                        text : 'strana', 
                                        data : [
                                            {text : 'Vnější', value : 'm', name : 'm'},
                                            {text : 'vnitřní', value : 'p', name : 'p'},

                                        ]
                                    },
                                    {
                                        text : 'okraj', 
                                        data : [
                                            {text : 'Všechny', value : ''},
                                            {text : 'Pravá', value : 'r', name : 'r'},
                                            {text : 'Levá', value : 'l', name : 'l'},
                                            {text : 'Horní', value : 't', name : 't'},
                                            {text : 'Dolní', value : 'b', name : 'b'}
                                        ]
                                    },
                                    {
                                        text : 'velikost', 
                                        data : [
                                            {text : 'Žádné', value : '-0'},
                                            {text : 'Velmi malé', value : '-1'},
                                            {text : 'Malé', value : '-2'},
                                            {text : 'Střední', value : '-3'},
                                            {text : 'Velké', value : '-4'},
                                            {text : 'Velmi velké', value : '-5'},
                                            {text : 'Automatické', value : 'auto'}
                                        ]
                                    }
                                ]
                            },
                            background : {
                                func : 'select',
                                text : 'Styl',
                                name : 'background',
                                data : [
                                    {text : 'Základní', value : 'btn-primary'},
                                    {text : 'Potvrzení', value : 'btn-success'},
                                    {text : 'Informace', value : 'btn-info'},
                                    {text : 'Varování', value : 'btn-warning'},
                                    {text : 'Nebezpečí', value : 'btn-danger'},
                                    {text : 'Šedý', value : 'btn-secondary'},
                                    {text : 'Tmavý', value : 'btn-dark'},
                                    {text : 'Světlý', value : 'btn-light'},
                                    {text : 'Základní-průhledný', value : 'btn-outline-primary'},
                                    {text : 'Potvrzení-průhledný', value : 'btn-outline-success'},
                                    {text : 'Informace-průhledný', value : 'btn-outline-info'},
                                    {text : 'Varování-průhledný', value : 'btn-outline-warning'},
                                    {text : 'Nebezpečí-průhledný', value : 'btn-outline-danger'},
                                    {text : 'Šedý-průhledný', value : 'btn-outline-secondary'},
                                    {text : 'Tmavý-průhledný', value : 'btn-outline-dark'},
                                    {text : 'Světlý-průhledný', value : 'btn-outline-light'},
                                    {text : 'Žádné', value : ''}
                                ]
                            },
                            borderR : {
                                func : 'select',
                                text : 'Zakulacení rohů',
                                name : 'borderR',
                                data : [
                                    {text : 'žádné', value : 'rounded-0'},
                                    {text : 'Malé', value : 'rounded-sm'},
                                    {text : 'Střední', value : 'rounded'},
                                    {text : 'Velké', value : 'rounded-lg'},
                                    {text : 'Úplné', value : 'rounded-circle'},
                                    {text : 'Vpravo', value : 'rounded-right'},
                                    {text : 'Vlevo', value : 'rounded-left'},
                                    {text : 'Nahoře', value : 'rounded-top'},
                                    {text : 'Dole', value : 'rounded-bottom'}
                                ]
                            },
                            borderColor : {
                                func : 'select',
                                text : 'Barva ohraničení',
                                name : 'borderColor',
                                data : [
                                    {text : 'Zeslabený', value : 'border-muted'},
                                    {text : 'Základní', value : 'border-primary'},
                                    {text : 'Potvrzení', value : 'border-success'},
                                    {text : 'Informace', value : 'border-info'},
                                    {text : 'Varování', value : 'border-warning'},
                                    {text : 'Nebezpečí', value : 'border-danger'},
                                    {text : 'Šedý', value : 'border-secondary'},
                                    {text : 'Tmavý', value : 'border-dark'},
                                    {text : 'Světlý', value : 'border-light'},
                                    {text : 'Bílý', value : 'border-light'},
                                    {text : 'Černý', value : 'border-body'},
                                    {text : 'Automaticky', value : ''}
                                ]
                            }
                        }
                    },
                    defItem : {
                        properities : {
                            class : 'btn'
                        }
                    }
                }
            }
        },
        navAlert : {
            text : 'Upozornění',
            items : {
                alert : {
                    way1 : 'navAlert',
                    way2 : 'alert',
                    text : 'Upozornění',
                    dom : 'div',
                    navBar : [['default'], ['text'], ['navAlert'], ['interactive'], ['editable']],
                    selfBar : {
                        properities : {
                            select : {
                                func : 'select',
                                text : 'Styl',
                                name : 'color',
                                data : [
                                    {text : 'Základní', value : 'alert-primary'},
                                    {text : 'Potvrzení', value : 'alert-success'},
                                    {text : 'Informace', value : 'alert-info'},
                                    {text : 'Varování', value : 'alert-warning'},
                                    {text : 'Nebezpečí', value : 'alert-danger'},
                                    {text : 'Šedý', value : 'alert-secondary'},
                                    {text : 'Tmavý', value : 'alert-dark'},
                                    {text : 'Světlý', value : 'alert-light'}
                                ]
                            }, 
                            paddingMargin : {
                                func : 'multiSelect',
                                text : 'Odsazení',
                                name : 'pm',
                                value : '',
                                data : [
                                    {
                                        text : 'strana', 
                                        data : [
                                            {text : 'Vnější', value : 'm', name : 'm'},
                                            {text : 'vnitřní', value : 'p', name : 'p'},

                                        ]
                                    },
                                    {
                                        text : 'okraj', 
                                        data : [
                                            {text : 'Všechny', value : ''},
                                            {text : 'Pravá', value : 'r', name : 'r'},
                                            {text : 'Levá', value : 'l', name : 'l'},
                                            {text : 'Horní', value : 't', name : 't'},
                                            {text : 'Dolní', value : 'b', name : 'b'}
                                        ]
                                    },
                                    {
                                        text : 'velikost', 
                                        data : [
                                            {text : 'Žádné', value : '-0'},
                                            {text : 'Velmi malé', value : '-1'},
                                            {text : 'Malé', value : '-2'},
                                            {text : 'Střední', value : '-3'},
                                            {text : 'Velké', value : '-4'},
                                            {text : 'Velmi velké', value : '-5'},
                                            {text : 'Automatické', value : 'auto'}
                                        ]
                                    }
                                ]
                            },
                            textColor : {
                                func : 'select',
                                text : 'Barva textu',
                                name : 'textColor',
                                data : [
                                    {text : 'Zeslabený', value : 'text-muted'},
                                    {text : 'Základní', value : 'text-primary'},
                                    {text : 'Potvrzení', value : 'text-success'},
                                    {text : 'Informace', value : 'text-info'},
                                    {text : 'Varování', value : 'text-warning'},
                                    {text : 'Nebezpečí', value : 'text-danger'},
                                    {text : 'Šedý', value : 'text-secondary'},
                                    {text : 'Tmavý', value : 'text-dark'},
                                    {text : 'Světlý', value : 'text-light'},
                                    {text : 'Bílý', value : 'text-light'},
                                    {text : 'Černý', value : 'text-body'},
                                    {text : 'Automaticky', value : ''}
                                ]
                            },
                            zarovnání : {
                                func : 'select',
                                text : 'Zarovnání',
                                name : 'display',
                                data : [
                                    {text : 'Vlevo', value : 'd-flex justify-content-start'},
                                    {text : 'Vpravo', value : 'd-flex justify-content-end'},
                                    {text : 'Střed', value : 'd-flex justify-content-center'},
                                    {text : 'Rozložení do krajů', value : 'd-flex justify-content-between'},
                                    {text : 'Rovnoměrné rozložení', value : 'd-flex justify-content-around'}
                                ]
                            },
                            borderR : {
                                func : 'select',
                                text : 'Zakulacení rohů',
                                name : 'borderR',
                                data : [
                                    {text : 'žádné', value : 'rounded-0'},
                                    {text : 'Malé', value : 'rounded-sm'},
                                    {text : 'Střední', value : 'rounded'},
                                    {text : 'Velké', value : 'rounded-lg'},
                                    {text : 'Úplné', value : 'rounded-circle'},
                                    {text : 'Základní', value : ''}
                                ]
                            },
                            borderColor : {
                                func : 'select',
                                text : 'Barva ohraničení',
                                name : 'borderColor',
                                data : [
                                    {text : 'Zeslabený', value : 'border-muted'},
                                    {text : 'Základní', value : 'border-primary'},
                                    {text : 'Potvrzení', value : 'border-success'},
                                    {text : 'Informace', value : 'border-info'},
                                    {text : 'Varování', value : 'border-warning'},
                                    {text : 'Nebezpečí', value : 'border-danger'},
                                    {text : 'Šedý', value : 'border-secondary'},
                                    {text : 'Tmavý', value : 'border-dark'},
                                    {text : 'Světlý', value : 'border-light'},
                                    {text : 'Bílý', value : 'border-light'},
                                    {text : 'Černý', value : 'border-body'},
                                    {text : 'Automaticky', value : 'border-body'}
                                ]
                            },
                        }
                    },
                    defItem : {
                        properities : {
                            class : 'alert',
                            color : 'alert-primary'
                        }
                    }
                }
            }
        },
        editable : {
            text : 'Proměnlivé',
            items : {
                p : {
                    way1 : 'editable',
                    way2 : 'p',
                    text : 'Text',
                    dom : 'p',
                    id : true,
                    navBar : [],
                    selfBar : {
                        properities : {
                            connectForm : {
                                func : 'connectForm',
                                text : 'propojení s formulářem',
                            }
                        }
                    },
                    defItem : {
                        properities : {},
                        text : 'Text z formuláře'
                    }
                }
            }
        }
    }


    for (const group in item) {
        if (item.hasOwnProperty(group)) {
            const items = item[group].items;
            for (const myItem in items) {
                if (items.hasOwnProperty(myItem) & myItem != 'text') {
                    const navBar = items[myItem].navBar;
                    for (let i = 0; i < navBar.length; i++) {
                        if(navBar[i].length == 1) {
                            navBar[i] = item[navBar[i][0]];
                        } else if (navBar[i].length > 1) {
                            let dat = { 
                                text : item[navBar[i][0]].text,
                                items : {}
                            };
                            for (let l = 1; l < navBar[i].length; l++) {
                                dat.items[navBar[i][l]] = item[navBar[i][0]].items[navBar[i][l]];
                            }
                            navBar[i] = dat;
                        }
                    }
                }
            }
        }
    }

    func = {
        xhttp : function(func, file, data) {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {if (this.readyState == 4 && this.status == 200) {func(this.responseText)}};
            xhttp.open('POST', file, true);
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhttp.send(data);
        }
    } 

    controler = function () {
        let canActive = true;
        this.canActive = function() {return canActive};
        this.canActiveTrue = function() {canActive = true};
        this.canActiveFalse = function() {canActive = false};

        let canShow = true;
        this.canShow = function() {return canShow};
        this.canShowTrue = function() {canShow = true};
        this.canShowFalse = function() {canShow = false};
    }

    properitiesFunc = function() {
        //data
        let canCreateForm = false;

        this.select = function(item, myData, func) {
            // informace - text (text), název (name), pole objektů (data) s textem (text) a hodnotou (value)
            //proměnné
            let dropdown;
            let menu;
            let div;

            div = document.createElement('div');
            div.className = 'btn-group px-1';

            dropdown = document.createElement('button');
            dropdown.className = 'btn btn-small btn-info rounded dropdown dropdown-toggle';
            dropdown.setAttribute('data-toggle', 'dropdown');
            dropdown.textContent = myData.text;
            
            menu = document.createElement('div');
            menu.className = 'dropdown-menu';
            for (let i = 0; i < myData.data.length; i++) {
                let a;
                a = document.createElement('a');
                a.className = 'dropdown-item';
                a.innerHTML = myData.data[i].text;
                a.onclick = function() {
                    if(myData.special) {
                        item.setSpecialProperity(myData.name, myData.data[i].value);
                    } else {
                        func(myData.name, myData.data[i].value);
                    }
                }
                menu.appendChild(a);
            }
            div.appendChild(menu);
            div.appendChild(dropdown);
            return div;
        }

        this.multiSelect = function(item, myData, func) {
            // informace - text (text), název (name), pole objektů (data) s textem (text) a hodnotou (value)
            //proměnné
            let button;
            let editor;
            let selectors = [];

            //dom
            let header = document.getElementById('multiSelectNadpis');
            let body = document.getElementById('multiSelectBody');
            let successBtn = document.getElementById('multiSelectSuccess');
            let cancelBtn = document.getElementById('multiSelectCancel');

            //f-ce
            let doTextEditor;
            let end;

            doTextEditor = function() {
                header.innerHTML = myData.text;
                for (let i = 0; i < myData.data.length; i++) {
                    const selfData = myData.data[i];
                    //proměnné
                    let div
                    let label
                    let select
                    let selectData = {};

                    selectors[i] = selectData;

                    div = document.createElement('div');
                    div.className = '';
                    body.appendChild(div);

                    label = document.createElement('label');
                    label.innerHTML = selfData.text;
                    div.appendChild(label);

                    select = document.createElement('select');
                    select.className = 'form-control';
                    div.appendChild(select);

                    for (let l = 0; l < selfData.data.length; l++) {
                        const element = selfData.data[l];
                        let option;

                        option = document.createElement('option');
                        option.innerHTML = element.text;
                        select.appendChild(option);
                    }

                    selectData.select = select;
                }
            }

            end = function() {
                while(body.children.length > 0) {
                    body.removeChild(body.lastChild);
                }
            }
            successBtn.onclick = function() {
                let name = myData.name;
                let value = myData.value;
                for (let i = 0; i < selectors.length; i++) {
                    for (let l = 0; l < myData.data[i].data.length; l++) {
                        const element = myData.data[i].data[l];
                        if (element.text == selectors[i].select.value){
                            if (element.name) {
                                name += element.name;
                            }
                            value += element.value;
                        }
                    }
                }
                func(name, value);
                end();
            }
            cancelBtn.onclick = function() {
                end();
            }

            button = document.createElement('button');
            button.className = 'btn btn-info mx-1';
            button.innerHTML = myData.text;
            button.setAttribute('data-toggle', 'modal');
            button.setAttribute('data-target', '#multiSelect')
            button.onclick = function() {doTextEditor()};
            return button;
        }

        this.textEditor = function(item) {
            //proměnné
            let myData;
            let button;
            let editor;

            //dom
            let navUl = document.getElementById('textEditorMenu');
            let iframe = document.getElementById('textEditorIframe');
            let successBtn = document.getElementById('textEditorSuccess');
            let cancelBtn = document.getElementById('textEditorCancel');

            //f-ce
            let doTextEditor;
            let appendZnacka;
            let end;

            end = function() {
                while(navUl.children.length > 0) {
                    navUl.removeChild(navUl.children[0]);
                }

            }

            appendZnacka = function(name, znacka) {
                iframe.contentWindow.focus();
                if (znacka.slice(0, 2) == 'FB') {
                    editor.execCommand('formatBlock', false, znacka.slice(2, znacka.length));
                } else {
                    editor.execCommand(znacka, false, null);
                }
                
                
                //alert(editor.body.innerHTML)
            }

            doTextEditor = function() {

                if (myData.menu) {
                    for (const properity in myData.menu) {
                        navUl.appendChild(data.properitiesFunc[myData.menu[properity].func]({},  myData.menu[properity], appendZnacka))
                    }
                }

                editor = iframe.contentWindow.document;
                editor.designMode = 'on';

                editor.head.innerHTML = '<link rel="stylesheet" href="/bootstrap/bootstrap.css"><link rel="stylesheet" href="/css/editsxsl.css"><script src="/bootstrap/jQuery.js"></script><script src="/bootstrap/popper.js"></script><script src="/bootstrap/bootstrap.js"></script>';
                editor.body.innerHTML = item.self.innerHTML;
            }

            myData = item.selfData.selfBar.properities.textEditor;

            successBtn.onclick = function() {
                if(myData.unstyl) {
                    item.self.innerHTML = editor.body.textContent;
                } else {
                    item.self.innerHTML = editor.body.innerHTML;
                }
                end();
            }
            cancelBtn.onclick = function() {
                end();
            }

            button = document.createElement('button');
            button.className = 'btn btn-info';
            button.innerHTML = myData.text;
            button.setAttribute('data-toggle', 'modal');
            button.setAttribute('data-target', '#textEditor')
            button.onclick = function() {doTextEditor()};
            return button;
        }

        this.connectForm = function(item) {
            //proměnné
            let button;

            //dom
            let createFormButton = document.getElementById('createFormButton');
            let createFormName = document.getElementById('createFormName');
            let createFormAlert = document.getElementById('createFormAlert');
            let createFormAlertNoName = document.getElementById('createFormAlertNoName');
            let autoCreateFormButton = document.getElementById('autoCreateFormButton');
            let autoCreateFormName = document.getElementById('autoCreateFormName');
            let autoCreateFormAlert = document.getElementById('autoCreateFormAlert');
            let autoCreateFormAlertNoName = document.getElementById('autoCreateFormAlertNoName');

            //f-ce
            let controlName;
            let createForm;

            //přiřazení f-cí k dom
            createFormName.onkeyup = function() {controlName(createFormName.value, createFormAlert, createFormAlertNoName, createFormButton)};
            createFormButton.onclick = function() {createForm(createFormName.value, createFormAlertNoName)}

            controlName = function(name, warning, warning2, success) {
                //f-ce
                let func;
                let test;
                //data

                func = function(text) {
                    if (text >= 1) {
                        warning.className = 'alert alert-danger';
                        success.className = 'btn btn-success disabled';
                        canCreateForm = false;
                    } else if (text == 0) {
                        warning.className = 'd-none';
                        success.className = 'btn btn-success';
                        canCreateForm = true;
                    }
                }

                test = function() {
                    data.func.xhttp(func, '/SRedakt/PHP/control.php', 'table=4&nameValid=' + name);
                }
                warning2.className = 'd-none';
                clearTimeout(data.timeout);
                data.timeout = setTimeout(test, 500);
            }

            createForm = function(name, warning, json = {}) {

                let func = function(text) {
                    window.open('/SRedakt/form.php?form=' + text);
                }
                if (name == '') {
                    warning.className = 'alert alert-danger';
                } else if (canCreateForm) {
                    data.func.xhttp(func, '/SRedakt/PHP/control.php', 'createForm=' + name + '&jsonForm=' + JSON.stringify(json));
                }
            }


            formElements[formElements.length] = item;            

            button = document.createElement('button');
            button.className = 'btn btn-info';
            button.innerHTML = 'Přiřazení formuláře';
            button.setAttribute('data-toggle', 'modal');
            button.setAttribute('data-target', '#connForm')

            return button;
        }

        this.button = function(item, myData, func) {
            let button = document.createElement('button');
            button.className = 'btn btn-small btn-info rounded mx-1';
            button.innerHTML = myData.text;
            button.onclick = function() {
                if(item.properities.hasOwnProperty(myData.name)) {
                    if(item.properities[myData.name] == myData.value) {
                        func(myData.name, '');
                    } else {func(myData.name, myData.value)};
                } else {func(myData.name, myData.value)};
            }
            return button;
        }

        this.href = function(item, myData, func) {
            // informace - text (text), název (name), pole objektů (data) s textem (text) a hodnotou (value)
            //proměnné
            let button;
            let editor;
            let selectors = [];
            let ul;
            let value;

            //dom
            let header = document.getElementById('multiSelectNadpis');
            let body = document.getElementById('multiSelectBody');
            let successBtn = document.getElementById('multiSelectSuccess');
            let cancelBtn = document.getElementById('multiSelectCancel');

            //f-ce
            let doTextEditor;
            let end;
            let dofce = {};
            let success;

            dofce.input = function () {
                let input;

                end();

                input = document.createElement('input');
                body.appendChild(input);

                successBtn.className = 'btn btn-success';
                successBtn.innerHTML = 'Potvrdit'
                successBtn.onclick = function() {
                    value = input.value;
                    success();
                }
            }

            dofce.self = function () {
                //f-ce
                let finnish;
                let form;

                form = function(adresa, id) {
                    let addres = [];
                    //f-ce
                    let finnish;

                    finnish = function(text) {
                        if (text == '[]') {
                            successBtn.className = 'btn btn-success';
                            successBtn.onclick = function() {
                                value = '/' + adresa;
                                success();
                            }
                        }
                        let myData = JSON.parse(text);
                        for (let i = 0; i < myData.length; i++) {
                            let table;
                            let thead;
                            let tr;
                            let tbody;
                            let div;
                            let div1;
                            let div2;
                            let a;
    
                            div = document.createElement('div');
                            div.className = 'card';
                            body.appendChild(div);
    
                            div1 = document.createElement('div');
                            div1.className = 'card-header';
                            div.appendChild(div1);
                        
                            a = document.createElement('a');
                            a.className = 'car-link';
                            a.setAttribute('data-toggle', 'collapse');
                            a.setAttribute('href', '#collapse' + i);
                            a.innerHTML = myData[i][0][0].nazev;
                            div1.appendChild(a);
    
                            div2 = document.createElement('div');
                            div2.className = 'card-body collapse';
                            div2.id = 'collapse' + i;
                            div.appendChild(div2);
    
                            table = document.createElement('table');
                            table.className = 'table';
                            div2.appendChild(table);

                            thead = document.createElement('thead');
                            table.appendChild(thead);

                            tr = document.createElement('tr');
                            thead.appendChild(tr);

                            tbody = document.createElement('tbody');
                            table.appendChild(tbody);

                            for (const key in JSON.parse(myData[i][0][0].json)) {
                                let th;
                                th = document.createElement('th');
                                th.innerHTML = key;
                                tr.appendChild(th);
                            }
    
                            for (let l = 0; l < myData[i][0].length; l++) {
                                const selfData = JSON.parse(myData[i][0][l].json);
                                let tr;
    
                                tr = document.createElement('tr');
                                tr.onclick = function() {
                                    addres[myData[i][0][l].nazev] = myData[i][0][l].id;
                                    div1.className = 'card-header bg-success';
                                    let okButton = true;
                                    for (let x = 0; x < body.children.length; x++) {
                                        if (body.children[x].children[0].className != 'card-header bg-success') {
                                            okButton = false;
                                            break;
                                        }
                                    }
                                    if(okButton) {
                                        successBtn.className = 'btn btn-success';
                                        successBtn.onclick = function() {
                                            adresa += '?forms=';
                                            for (const key in addres) {
                                                if (addres.hasOwnProperty(key)) {
                                                    const element = addres[key];
                                                    adresa += element + '/';
                                                }
                                            }
                                            value = '/' + adresa;
                                            success();
                                        }
                                    }
                                    for (let x = 0; x < tbody.children.length; x++) {
                                        tbody.children[x].className = '';
                                    }
                                    tr.className = 'card-header bg-success';
                                }
                                tbody.appendChild(tr);
                                for (const key in selfData) {
                                    if (selfData.hasOwnProperty(key)) {
                                        const element = selfData[key];
                                        let td;
                                        td = document.createElement('td');
                                        td.innerHTML = element;
                                        tr.appendChild(td);
                                    }
                                }
                            }
                        }
                    }

                    data.func.xhttp(finnish, '/SRedakt/PHP/control.php', 'adresForm=' + id);
                    end()
                }

                finnish = function (text) {
                    let myData = JSON.parse(text);
                    for (let i = 0; i < myData.length; i++) {
                        let ul;
                        let div;
                        let div1;
                        let div2;
                        let a;

                        div = document.createElement('div');
                        div.className = 'card';
                        body.appendChild(div);

                        div1 = document.createElement('div');
                        div1.className = 'card-header';
                        div.appendChild(div1);
                    
                        a = document.createElement('a');
                        a.className = 'car-link';
                        a.setAttribute('data-toggle', 'collapse');
                        a.setAttribute('href', '#collapse' + i)
                        a.innerHTML = myData[i][0]
                        div1.appendChild(a);

                        div2 = document.createElement('div');
                        div2.className = 'card-body collapse';
                        div2.id = 'collapse' + i;
                        div.appendChild(div2);

                        ul = document.createElement('ul');
                        ul.className = 'list-group list-group-flush';
                        div2.appendChild(ul);

                        for (let l = 0; l < myData[i][1].length; l++) {
                            const selfData = myData[i][1][l];
                            let li;
                            
                            li = document.createElement('li');
                            li.className = 'list-group-item';
                            li.innerHTML = selfData.nazev;
                            li.onclick = function() {
                                form(selfData.adresa, selfData.id);
                            }
                            ul.appendChild(li);
                        }
                    }
                }

                data.func.xhttp(finnish, '/SRedakt/PHP/control.php', 'publicSides=true');
                end();
            }

            doTextEditor = function() {
                header.innerHTML = myData.text;
                ul = document.createElement('ul');
                ul.className = 'list-group list-group-flush';
                body.appendChild(ul);

                for (let i = 0; i < myData.data.length; i++) {
                    const selfData =  myData.data[i];
                    
                    let li = document.createElement('li');
                    li.innerHTML = selfData.text;
                    li.className = 'list-group-item';
                    li.onclick = function() {dofce[selfData.fce]()};
                    ul.appendChild(li);
                }
            }
            successBtn.className = 'd-none';
            success = function() {
                item.setSpecialProperity(myData.name, value);
                end();
            }
            cancelBtn.onclick = function() {
                end();
            }

            
            end = function() {
                while(body.children.length > 0) {
                    body.removeChild(body.lastChild);
                }
            }

            button = document.createElement('button');
            button.className = 'btn btn-info mx-1';
            button.innerHTML = myData.text;
            button.setAttribute('data-toggle', 'modal');
            button.setAttribute('data-target', '#multiSelect')
            button.onclick = function() {doTextEditor()};
            return button;
        }
    }

    temp = function() {
        this.appChild = function(id) {
            data.activeItem.appChild(id, true);
        }
    }

    this.item = item;
    this.func = func;
    this.controler = new controler();
    this.properitiesFunc = new properitiesFunc();
    this.formElements = formElements;
    this.temp = new temp();
}