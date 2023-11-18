import React from 'react'
import { Row } from 'react-bootstrap'
import PropTypes from 'prop-types';

export default function RowTemplate({ templateContent, children }) {

    return (
        <>
            {Object.entries(templateContent).map(([key, value], index) => {
                return (
                    <Row key={index} style={{paddingBottom:'2%', paddingTop:'2%'}}>
                    {key === 'h1' ? ( <h1>{value}</h1>) : null }
                    {key === 'h2' ? (<h2>{value}</h2>) : null}
                    {key === 'description' && value.length > 0 && (
                        <>
                            {value.map((desc, descIndex) => (
                                <p key={descIndex}>{desc}</p>
                            ))}
                        </>
                    )}
                    {key === 'h4' ? (<h4>{value}</h4>) : null }
                    {key === 'h4Description' ? (<p>{value}</p>) : null}
                    {key === 'h5' ? (<h5>{value}</h5>) : null}
                    {key === 'orderedlist' && value.length > 0 && (
                        <ol>
                            {value.map((desc, descIndex) => (
                                <li key={descIndex}>{desc}</li>
                            ))}
                        </ol>
                    )}
                    {key === 'unorderedlist' && value.length > 0 && (
                        <ul>
                            {value.map((desc, descIndex) => (
                                <li key={descIndex} dangerouslySetInnerHTML={{ __html: desc }} />
                                // >{desc}</li>
                            ))}
                        </ul>
                    )}                   
                        {children}
                    </Row>
                ) 
            })}
        </>
    )
}

RowTemplate.propTypes = {
    templateContent: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.shape({
                bigTitle: PropTypes.string,
                title: PropTypes.string,
                description: PropTypes.arrayOf(PropTypes.string)
            })
        ),
        PropTypes.object,  
    ]),
};