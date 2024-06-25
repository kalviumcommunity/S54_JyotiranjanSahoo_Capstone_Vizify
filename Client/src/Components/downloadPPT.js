import pptxgen from "pptxgenjs"

const downloadPPT = (data,title) => {
    console.log(data);
    console.log(title);
    let pres = new pptxgen();
    // pres.background = {
    //     path: data.background.image,
    //     // size: "cover"
    // };

    // pptDetails.slides.forEach((e,i)=>{
    //     let slide = pres.addSlide()
    //     slide.background = {path: pptDetails.background.image}
        // e.elements.forEach((ele,i)=>{
        //     if(ele.type === "text"){
        //         slide.addText(ele.element.text,{...ele.pos_size,...ele.element.options,lineSpacing: 20})
        //     }else if(ele.type === "image"){
        //         console.log(ele.element.path);
        //         slide.addImage({path: ele.element.path.replace("https","http")})
        //     }
        // })
    // })
    data.slides.forEach((slideData) => {
        let slide = pres.addSlide();
        slide.background = {path: data.background.image}

        // Iterate through elements
        slideData.elements.forEach((elementData) => {
            const { type, element, pos_size } = elementData;
            
            if (type === 'text') {
                slide.addText(element.text, {
                    ...pos_size,
                    ...element.options
                });
            } else if (type === 'image') {
                slide.addImage({
                    ...element,...pos_size
                });
            }
        });
    })


    pres.writeFile({fileName: `${title}.pptx`})
}

export default downloadPPT