import React from 'react';

export default class LoggedInBanner extends React.Component {

    render() {
        return (
            <div>
                <div className="ui blue three item inverted menu">
                    <a className="header item" href="/">Curtain Logo</a>
                    <div className="right item ">
                        <a className="item">Hi Amit Chavda !</a>
                        <img className="ui mini image" src="/images/person_profile_user.png" />
                    </div>
                </div>
            </div>
        )
    }
}
