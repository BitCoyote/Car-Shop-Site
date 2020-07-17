import React from 'react'
import SEO from '../../../../shared/components/seo/seo'
import LayoutDefault from '../../../../shared/components/layout/layout'
import { Block } from 'gerami'
import './feedback.scss'

type FeedbackProps = {}

const Feedback: React.FC<FeedbackProps> = () => {
  return (
    <>
      <SEO title="Feedback" />

      <LayoutDefault headerProps={{ mode: 'primary' }}>
        <Block className="center registration-container">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScGr8rLqD-tntjntVT5TupqORR4wcCZ9DEmAXNqr_ptZD9yaw/viewform?embedded=true"
            frameBorder={0}
            scrolling={'no'}
            className="registration-form"
          >
            Loading…
          </iframe>
        </Block>
      </LayoutDefault>
    </>
  )
}

export default Feedback
