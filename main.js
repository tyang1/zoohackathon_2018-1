let db_url;
let animal_name;

var endangered_animals = ["African Elephant", "Woolly Mammoth", "parrot"];
var page_content;
var enfo_popper;
var popperNode;

//ANYTIME YOU NEED TO USE AN ID FOR AN ANIMAL CALL THIS
function translateId(animal) {
    return animal.replace(/ /g, "");
}

function showModal(animal) {
    referenceObject = $(`#${translateId(animal)}`)
    //$(`#${animal}`).css("display", "block")
    popperNode = $('#enfo_popup')
    popperNode.css("display", "block")

    enfo_popper = new Popper(referenceObject, popperNode, {
        placement: 'top',
        modifiers: {
            flip: {
                behavior: ['left', 'right', 'top', 'bottom']
            },
            offset: {
                enabled: true,
                offset: '0,10'
            }
        }
    });
}

function hideModal() {
    popperNode.css("display", "none")
    enfo_popper.destroy()
}

//Append the popup element to the body
function insert_popup() {
    page_content = `<div id="enfo_popup" style="background-color: white;
  margin: auto;
  padding: 20px;
  display: none;
  border: 1px solid #888;
  width: 30%;" class="modal"><div class="modal-content"><img id="enfo_popup_animal_img" height="200px" width="200px" src=""></img><img id="enfo_popup_stats_img" width="100px" height="100px" src=""><p id="enfo_popup_text">placeholder text</p></div></div>`
    page_content = document.body.innerHTML.concat(page_content);
    $("body").html(page_content);
}

function populateModal(animal_id) {
    let animal_name = document.getElementById(animal_id).innerHTML.toLowerCase();

    let endangerment_level
    let animal_img
    let graph_img
    let blurb

    switch(animal_name) {
        case "african elephant":
            endangerment_level = "salmon"
            animal_img = "http://acsweb.ucsd.edu/~jggross/image_hoster/zoohackathon_2018_animals/african_elephant.jpg"
            graph_img = ""
            blurb = "The African bush elephant (Loxodonta africana), also known as the African savanna elephant, is the larger of the two species of African elephants, and the largest living terrestrial animal. These elephants were previously regarded as the same species, but the African forest elephant has been reclassified as L. cyclotis."
            break
        default:
            endangerment_level = ""
            animal_img = ""
            graph_img = ""
            blurb = ""
    }

    $("#enfo_popup").css("background", endangerment_level)
    $("#enfo_popup_animal_img").attr("src", animal_img)
    $("#enfo_popup_text").html(blurb)
    


}

function highlight_species() {
    endangered_animals.forEach(function (animal) {
        page_content = document.body.innerHTML.replace(
            new RegExp(animal, "gi"),
            `<span class='enfo' data=${translateId(
                animal
            )} style='color: green; text-decoration: underline'>${animal}</span>`
        );
        $("body").html(page_content);
    });
}

insert_popup();
highlight_species();

$(document).ready(function () {
    $(".enfo").hover(function () {

        $(this).css("background", "lightblue")

        //Get the name of the animal being hovered
        let animal_id = $(this).attr("data")
        $(this).attr("id", animal_id)
        console.log("got here")
        populateModal($(this).attr("id"))
        showModal($(this).attr("id"))
    }, function () {
        $(this).css("background", "")
        $(this).attr("id", "")
        hideModal()
    });

});
