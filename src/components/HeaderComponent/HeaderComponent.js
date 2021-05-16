import { useEffect } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@material-ui/icons/Language';
import IconButton from "@material-ui/core/IconButton";

import logo from '../../assets/centimeLogo.png';
import {DropdownButton, Dropdown} from 'react-bootstrap';
import i18next from 'i18next';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import './HeaderComponent.css';

const languages = [
    {
        code: 'fr',
        name: 'Français',
        country_code: 'fr'
    },
    {
        code: 'en',
        name: 'English',
        country_code: 'gb'
    },
    {
        code: 'ar',
        name: 'عربى',
        country_code: 'sa',
        dir: 'rtl'
    }
]

const HeaderComponent = () => {   
    const [currentLanguageCode,setcurrentLanguageCode] = React.useState(Cookies.get('i18next') || 'en');
    const [currentLanguage, setcurrentLanguage] = React.useState(languages.find(l => l.code === currentLanguageCode));
    console.log(currentLanguageCode,currentLanguage, Cookies.get('i18Next'));
    
    useEffect(()=> {
        document.body.dir = currentLanguage.dir || "ltr";
        console.log("dir",document.body.dir);
    },[currentLanguageCode])

    const onChangeLang = (code)=>{
        i18next.changeLanguage(code);
        const newcurrentLanguageCode = Cookies.get('i18next') || 'en';
        const newCurrentLanguage = languages.find(l => l.code === newcurrentLanguageCode);
        console.log("onclick2",newCurrentLanguage);
        setcurrentLanguage(newCurrentLanguage);
        setcurrentLanguageCode(newcurrentLanguageCode);
    }
    const dropdownTitle = () => {
        return (
            <IconButton
                aria-label="select language" style={{ padding: 0 }}
            >
                <LanguageIcon style={{ fontSize: 24, padding: 0 , color: "white"}}/>
            </IconButton>
        )
    }
    return (
        <div className="header-container">
            <div className="display-flex header-content">
                <div className="float-left">
                    <img src={logo} width="210" height="40" alt="Centime"></img>
                </div>
                <div className="header-dropdown-container">
                    <div className="float-right">
                    <DropdownButton id="dropdown-basic-button" title={dropdownTitle()}>
                        {languages.map(({ code, name, country_code }) => (
                            <Dropdown.Item href={code} onClick={() => onChangeLang(code)}><span className={`m-r12 flag-icon flag-icon-${country_code}`}></span>
                                {name}</Dropdown.Item>

                        ))}
                    </DropdownButton>
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default HeaderComponent;