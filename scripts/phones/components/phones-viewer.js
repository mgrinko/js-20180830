import Component from "../../component.js";

'use strict'

export default class PhoneViewer extends Component{

    constructor({element}) {

        super({element: element});
        // this._element = element; -> происходит в родительском классе
        
    }

    _render() {
        this._element.innerHTML = `
            <img class="phone" src="img/phones/motorola-xoom-with-wi-fi.0.jpg">

            <button>Back</button>
            <button>Add to basket</button>
        
        
            <h1>Motorola XOOM™ with Wi-Fi</h1>
        
            <p>Motorola XOOM with Wi-Fi has a super-powerful dual-core processor and Android™ 3.0 (Honeycomb) — the Android platform designed specifically for tablets. With its 10.1-inch HD widescreen display, you’ll enjoy HD video in a thin, light, powerful and upgradeable tablet.</p>
        
            <ul class="phone-thumbs">
            <li>
                <img src="img/phones/motorola-xoom-with-wi-fi.0.jpg">
            </li>
            <li>
                <img src="img/phones/motorola-xoom-with-wi-fi.1.jpg">
            </li>
            <li>
                <img src="img/phones/motorola-xoom-with-wi-fi.2.jpg">
            </li>
            <li>
                <img src="img/phones/motorola-xoom-with-wi-fi.3.jpg">
            </li>
            <li>
                <img src="img/phones/motorola-xoom-with-wi-fi.4.jpg">
            </li>
            <li>
                <img src="img/phones/motorola-xoom-with-wi-fi.5.jpg">
            </li>
            </ul>
        `;
    }

    //переопределение метода show()
    show(phoneDetails) {
        this.phone = phoneDetails;
        this._render();
    }

}

