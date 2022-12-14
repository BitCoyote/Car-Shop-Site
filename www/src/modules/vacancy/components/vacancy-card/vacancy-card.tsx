import moment from 'moment'
import React, { useMemo } from 'react'
import { AiOutlineClockCircle, AiOutlineDownload } from 'react-icons/all'

import { Vacancy } from '../../../../../gen/apollo-types'
import LocationPin from '../../../../assets/icons/cil_location-pin.svg'
import Anchor from '../../../../shared/components/anchor/anchor'
import Button from '../../../../shared/components/button/button'
import MarkdownToText from '../../../../shared/components/markdown-to-text/markdown-to-text'
import './vacancy-card.scss'

type VacancyCardProps = {
  vacancy: Pick<
    Vacancy,
    'id' | 'title' | 'location' | 'deadline' | 'description' | 'attachment'
  >
}

const VacancyCard: React.FC<VacancyCardProps> = ({ vacancy }) => {
  const deadline = useMemo(() => new Date(vacancy.deadline), [vacancy.deadline])
  const isExpired = useMemo(() => Date.now() - deadline.getTime() > 0, [
    deadline,
  ])

  return (
    <div className={`vacancy-card ${isExpired ? `vacancy-card-expired` : ``}`}>
      <div className="vacancy-card-strip" />

      <div className="vacancy-card-content">
        <h4>
          <Anchor to={`/vacancies/detail/?id=${vacancy.id}`}>
            {vacancy.title}
          </Anchor>
        </h4>
        <h5>
          <div>
            <LocationPin style={{ width: 18, height: 18 }} />
            <span>{vacancy.location}</span>
          </div>
          <div>
            <AiOutlineClockCircle />
            <span>
              {isExpired ? (
                <>
                  <span className="fg-primary">Closed</span> on
                </>
              ) : (
                <>Apply by</>
              )}{' '}
              {moment(deadline).format('MMMM d, YYYY')}
            </span>
          </div>
        </h5>

        <p>
          <MarkdownToText>{vacancy.description}</MarkdownToText>
        </p>
      </div>

      <div className="vacancy-card-actions">
        <Button to={`/vacancies/detail/?id=${vacancy.id}`} mode="lite">
          More detail
        </Button>
        {isExpired || !vacancy.attachment?.url ? null : (
          <Button
            to={`${vacancy.attachment.url}`}
            download
            target="_blank"
            rel="noopener nofollow"
            mode="primary"
          >
            <AiOutlineDownload />
            <span>Download</span>
          </Button>
        )}
      </div>
    </div>
  )
}

export default VacancyCard
