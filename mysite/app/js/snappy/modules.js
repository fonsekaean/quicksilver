/**
 * Constants
 */
const _ = require('underscore');
const alertify = require('alertify.js');
const $snappy = $('#snappy');

const SwiftVideos = ['e-ORhEE9VVg'];
const modules = {};
const text = {
    heading        : `Lets get some mullet grundies.`,
    paragraph      : `Lets get some mullet my as cross as a rego. As dry as a hottie how as cross as a outback. Get a dog up ya dog's balls flaming mad as a troppo. Lets throw a bush telly my flat out like a dero. Flat out like a not my bowl of rice piece of piss fisho. Come a give it a burl flaming get a dog up ya grundies.Lets get some mullet my as cross as a rego. As dry as a hottie how as cross as a outback. Get a dog up ya dog's balls flaming mad as a troppo. Lets throw a bush telly my flat out like a dero. Flat out like a not my bowl of rice piece of piss fisho. Come a give it a burl flaming get a dog up ya grundies.`,
    short_paragraph: `Lets get some mullet my as cross as a rego. As dry as a hottie how as cross as a outback  Get a dog up ya dog's balls flaming mad as a troppo throw a bush telly my flat out like a dero.`,
};

export function moduleEdit() {
    return `<div class="moduleEdit">
                <span class="green"><div class="js-drag"></div><i class="material-icons">drag_handle</i></span>
                <span class="js-edit-settings grey"><i class="material-icons">settings</i></span>
                <span class="js-edit-html blue"><i class="material-icons">code</i></span>
                <span class="red"><i class="material-icons">delete</i></span>
            </div>`;

};

let templates = {

    divider: function () {
        return `<div class="contentModule divider">
                    ${moduleEdit()}
                    <div class="wrap">
                        <hr>
                    </div>                    
                </div>`;
    },

    blockquote: function () {
        return `<div class="module contentModule blockquote">
                    ${moduleEdit()}
                    <div class="wrap">
                        <blockquote contenteditable="true">
                           <h6>${text.short_paragraph}</h6>
                            <span class="attribution" contenteditable="true">Joan of Ark</span>
                        </blockquote>
                    </div>
                </div>`;
    },

    text: function () {
        return `<div class="module contentModule text">
                    ${moduleEdit()}
                    <div class="wrap" contenteditable="true">
                        <h3>${text.heading}</h3>
                        <p>${text.paragraph}</p>
                        <p>${text.paragraph}</p>
                    </div>
                </div>`;
    },

    video: function () {
        return `<div class="module contentModule video">
                    ${moduleEdit()}
                    <div class="wrap">
                        <div class="image" style="background-image:url('http://img.youtube.com/vi/${_.sample(SwiftVideos)}/maxresdefault.jpg');">
                            <a href="#" class="material-icons">play_circle_outline
                            </a>
                        </div>
                    </div>
                </div>`;
    },

    image: function () {
        return `<div class="module contentModule image">
                    ${moduleEdit()}
                    <div class="wrap">
                        <img style="width:100%;height:auto;" src="http://placehold.it/1440x760?text=Image">
                        <p contenteditable="true">${text.heading}</p>
                    </div>
                </div>`;
    }


}

export function create(type) {
    if (templates[type] !== undefined) {
        return templates[type]();
    } else {
        alertify.error('That template doe not exist yet');
    }
}


export function updateOrder() {
    alertify.maxLogItems(1).success('Row order updated')
    log('updateOrder() => Updating the order of the modules');
}

/**
 * Remove all active editMode elements
 */
export function exitEditMode() {
    $('.editMode').removeClass('editMode');
}

/**
 * Activate editMode for the curreent contentModule
 */
export function enterEditMode($el) {
    if ($el.hasClass('editMode')) {
        return false;
    } else {
        exitEditMode();
        $el.addClass('editMode');
        log('enterEditMode() => Entering edit mode');
    }
}

/**
 *
 * INTERACTIONS
 *
 */
$snappy.on('click', '.contentModule', function () {
    enterEditMode($(this));
});

$snappy.mousedown(function (e) {
    var container = $('[contenteditable=true]');
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.blur();
    }
});
