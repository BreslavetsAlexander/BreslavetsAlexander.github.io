import React from 'react'
import {NavLink} from 'react-router-dom'

export default function Problems({problems}) {
    return (
        <div>
            <div className="text-center mb-4">
                <NavLink to={"/add-problem-form"} className="btn btn-secondary">Задать вопрос</NavLink>
            </div>
            {
                problems.map((problem) => {
                    return <div key={problem.id} className="my-3 p-3 bg-white rounded shadow-sm">
                                <div className="row">
                                    <div className="col-1 text-muted">
                                        <div className="rate">
                                            <div className="rate__value">{problem.points}</div>
                                            <div className="rate__name">Голосов</div>
                                        </div>
                                    </div>
                                    <div className="col-1 text-muted">
                                        <div className="rate">
                                            <div className="rate__value">{!problem.comments ? 0 : problem.comments.length}</div>
                                            <div className="rate__name">Ответов</div>
                                        </div>
                                    </div>
                                    <div className="col-1 text-muted">
                                        <div className="rate">
                                            <div className="rate__value">{problem.viewsNumber}</div>
                                            <div className="rate__name">Просмотров</div>
                                        </div>
                                    </div>
                                    <div className="col pl-5">
                                        <div>
                                            <h5>
                                                <NavLink to={{pathname: `/problems/${problem.id}`}}>{problem.title}</NavLink>
                                            </h5>
                                            <div>
                                                {
                                                    problem.badges.map((badge, i) => {
                                                        return <a key={i} href="#" className="badge badge-dark" style={{marginRight: '3px'}}>{badge.toUpperCase()}</a>
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                })
            }
        </div>
    )
}