import React from 'react'
import Carousel from 'react-grid-carousel'

// data = [
//   person1 : [],
//   person2 : []
// ]

function Gallery(props) {
  return (
    <Carousel cols={4} rows={1} loop>
      {
        props.images.map((img , i) => {
          return (
            <Carousel.Item key = {i}>
              <img width="60%" src = {img} />
            </Carousel.Item>
          )
        })
      }
    </Carousel>
  )
}

export default Gallery
