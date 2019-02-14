import {
    Util
} from './Util.js'


export class AnimLettre {

    /**
     * Classe permettant de créer et d'animer une introduction
     * @param {object} o - contient l'ensemble des mots d'intro
     * @param {DOMElement} elementParent - Conteneur de l'animation
     * @param {function} fonction - l'adresse de la fonction à exécuter après l'animation
         
     }}
     */

    constructor(lesLettres, elementParent, fonction) {
        //Récupérer les valeurs passées en paramètre			
        this.lesLettres = lesLettres;

        this.elmParent = elementParent;
        this.anim_lettres(this.lesLettres);
        this.fonction = fonction;
    }


    anim_lettres(lesLettres) {
        /* Création des élément DOM qui seront animés. 
        Les éléments seront intégré dans le conteneur elmParent
        */
        let elmConteneur = this.creerElement(
            this.elmParent,
            'section',
            '',
            'mot'
        );

        let i = 0;
        const tabCouleur = ['#CC231E', '#235E6F', '#009900', '#34A65F', '#0F8A5F', '#F5624D']
        let nbLettres = lesLettres.length;

        for (let uneLettre of lesLettres) {

            let elmLettre = this.creerElement(
                elmConteneur,
                'div',
                uneLettre
            );

            elmLettre.style.animationDelay = (i * 0.5) + "s";
            elmLettre.style.color = tabCouleur[(i++) % 7]

        } // fin for

        //Quand l'animation de la dernière lettre du mot joyeux est terminée la fonction animerNoel est appelée	
        // lesLettres[nbLettres - 1].addEventListener("animationend", animationLettres, false);

        /* On garde une référence sur la fonction terminerIntro */
        let refTerminerIntro = this.terminerIntro.bind(this);
        // elmBouton.addEventListener('mousedown', this.terminerIntro.bind(this));
    }

    creerElement(elmParent, balise, contenu, classCSS) {
        console.log(balise)
        let noeud = document.createElement(balise)
        if (contenu != '') {
            noeud.innerHTML = contenu
        }
        noeud.classList.add(classCSS)
        elmParent.appendChild(noeud)
        return noeud
    }

    terminerIntro(evt) {
        this.elmParent.firstChild.classList.add('deplacementContenuIntro')
        this.elmParent.firstChild.addEventListener('animationend', this.passerVersAnimationSuivante.bind(this))
    }

    passerVersAnimationSuivante(evt) {
        Util.detruireTousLesNoeud(this.elmParent, this.elmParent)
        this.fonction()

    }

}