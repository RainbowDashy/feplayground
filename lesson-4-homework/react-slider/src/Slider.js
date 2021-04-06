import React, { useRef, useCallback } from "react"
import styled from "styled-components"
import { useSprings, animated } from "react-spring"
import { useDrag } from "react-use-gesture"

import Arrow from './Arrow'

const StyledSliderArrows = styled.div`
	top: 50%;
	position: absolute;
	width: 100%;
	z-index: 1;
	display: flex;
	justify-content: space-between;
`;

const StyledWrapper = styled.div`
	width: 100%;
	height: 100%;
`;

const StyledSlider = styled.div`
	position: relative;
	overflow: hidden;
	width: 100%;
	height: 100%;
`;

const StyledSlide = styled.div`
	width: 100%;
	height: 100%;
	will-change: transform;
	user-select: none;
    pointer-events: none;
`;

const Slider = ({
    children = [],
    hasArrows = false,
}) => {
    const sliderRef = useRef(null)
	const [springProps, setSpringProps] = useSprings(
		children.length,
		(index) => ({
			x: (index < children.length - 1 ? index : -1)
		})
	)

    const prev = useRef(0)
    const currentIndex = useRef(0)

    // v-current visible index
    const calcPos = useCallback((v, i, l = children.length) => {
        if (v === l - 1 && i === 0)
            return 1
        if (v === 0 && i === l - 1)
            return -1
        return i - v
    }, [children.length])

    const runSprings = useCallback((vx, down, cancel, xDelta) => {
        const { width } = sliderRef.current.parentElement.getBoundingClientRect()
        if (!down) {
            if (Math.abs(xDelta) > width/4) {
                currentIndex.current += (vx < 0 ? -1 : 1)
                currentIndex.current = (currentIndex.current + children.length) % children.length
            } else {
                cancel()
            }
        }
        const cur = currentIndex.current
        setSpringProps((i) => {
            let pos = calcPos(cur, i)
            let prevPos = calcPos(prev.current, i)
            return {
                x: pos + (down ? xDelta / width : 0),
                immediate: vx > 0 ? pos > prevPos : pos < prevPos,
            }
        })
        prev.current = cur
    }, [children.length, setSpringProps, calcPos])

    const bind = useDrag(({vxvy: [vx], down, cancel, movement: [xMove]}) => {
        vx && runSprings(-vx, down, cancel, xMove)
    })

    const childs = children.map((child, index) => (
        <StyledSlide key={index}>{child}</StyledSlide>
    ))

    const previousSlide = () => {
        currentIndex.current = (currentIndex.current - 1 + children.length) % children.length
        runSprings(-1, true, ()=>{}, 0)
    }

    const nextSlide = () => {
        currentIndex.current = (currentIndex.current + 1 + children.length) % children.length
        runSprings(1, true, ()=>{}, 0)
    }

    return (
        <StyledWrapper ref={sliderRef}>
            <StyledSlider>
                {hasArrows && (
                    <StyledSliderArrows>
                        <Arrow
                            direction="left"
                            onClick={previousSlide}
                        />
                        <Arrow
                            direction="right"
                            onClick={nextSlide}
                        />
                    </StyledSliderArrows>
                )}
                {springProps.map( ({x}, index) => (
                    <animated.div
                        {...bind()}
                        key={index}
                        className="slider__slide"
                        style={{
                            transform: x.interpolate(
								(offsetX) => `translate3d(${offsetX * 100}%, 0, 0)`
							),
							position: "absolute",
							width: "100%",
							height: "100%",
							willChange: "transform",
                        }}
                    >
                        {childs[index]}
                    </animated.div>
                ))}
            </StyledSlider>
        </StyledWrapper>
    )
}

export default Slider