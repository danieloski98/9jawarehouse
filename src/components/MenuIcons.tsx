import React from 'react';

export default function Icons(props: any) {
    console.log(props);
    return(
        <>
            {props.icons === 'overview' && props.index !== '/dashboard' ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18.137" viewBox="0 0 18 18.137">
                        <g id="home" transform="translate(0.75 0.882)">
                            <path id="Vector" d="M0,6.95V1A1,1,0,0,1,1,0H4.56a1,1,0,0,1,1,1V6.95H0Z" transform="translate(5.47 9.554)" fill="none" stroke="#777" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke-dasharray="0 0"/>
                            <path id="Vector-2" data-name="Vector" d="M16.5,13.695A2.743,2.743,0,0,1,13.824,16.5H2.676A2.743,2.743,0,0,1,0,13.695V7.71A2.845,2.845,0,0,1,.963,5.552L6.538.656a2.564,2.564,0,0,1,3.425,0l5.574,4.9A2.845,2.845,0,0,1,16.5,7.71Z" fill="none" stroke="#777" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke-dasharray="0 0"/>
                        </g>
                    </svg>
               : props.icons === 'overview' && props.index === '/dashboard' ? 
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18.137" viewBox="0 0 18 18.137">
                        <g id="home" transform="translate(0.75 0.882)">
                            <path id="Vector" d="M0,6.95V1A1,1,0,0,1,1,0H4.56a1,1,0,0,1,1,1V6.95H0Z" transform="translate(5.47 9.554)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke-dasharray="0 0"/>
                            <path id="Vector-2" data-name="Vector" d="M16.5,13.695A2.743,2.743,0,0,1,13.824,16.5H2.676A2.743,2.743,0,0,1,0,13.695V7.71A2.845,2.845,0,0,1,.963,5.552L6.538.656a2.564,2.564,0,0,1,3.425,0l5.574,4.9A2.845,2.845,0,0,1,16.5,7.71Z" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke-dasharray="0 0"/>
                        </g>
                    </svg>
                :null
            }
            {props.icons === 'activity' && props.index !== '/dashboard/activity' ?
                <svg xmlns="http://www.w3.org/2000/svg" width="17.5" height="17.5" viewBox="0 0 17.5 17.5">
                    <g id="Iconly_Light_Activity" data-name="Iconly/Light/Activity" transform="translate(0.75 0.75)">
                      <g id="Activity">
                        <path id="Path_33966" d="M0,4.156,2.5.915,5.356,3.15,7.8,0" transform="translate(3.734 6.261)" fill="none" stroke="#777" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                        <ellipse id="Ellipse_741" cx="1.607" cy="1.602" rx="1.607" ry="1.602" transform="translate(12.786)" fill="none" stroke="#777" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                        <path id="Path" d="M10.154,0H4.078A3.95,3.95,0,0,0,0,4.286V11.02A3.927,3.927,0,0,0,4.078,15.3h7.193A3.943,3.943,0,0,0,15.35,11.02V5.155" transform="translate(0 0.702)" fill="none" stroke="#777" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                      </g>
                    </g>
                  </svg>
               : props.icons === 'activity' && props.index === '/dashboard/activity' ? 
                    <svg xmlns="http://www.w3.org/2000/svg" width="17.5" height="17.5" viewBox="0 0 17.5 17.5">
                        <g id="Iconly_Light_Activity" data-name="Iconly/Light/Activity" transform="translate(0.75 0.75)">
                            <g id="Activity">
                            <path id="Path_33966" d="M0,4.156,2.5.915,5.356,3.15,7.8,0" transform="translate(3.734 6.261)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                            <ellipse id="Ellipse_741" cx="1.607" cy="1.602" rx="1.607" ry="1.602" transform="translate(12.786)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                            <path id="Path" d="M10.154,0H4.078A3.95,3.95,0,0,0,0,4.286V11.02A3.927,3.927,0,0,0,4.078,15.3h7.193A3.943,3.943,0,0,0,15.35,11.02V5.155" transform="translate(0 0.702)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                            </g>
                        </g>
                    </svg>
                :null
            }
            {props.icons === 'vendors' && props.index !== '/dashboard/vendors' ?
                    <svg id="Iconly_Light-outline_2_User" data-name="Iconly/Light-outline/2 User" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                        <g id="_2_User" data-name="2 User" transform="translate(0 0)">
                        <path id="_2_User-2" data-name="2 User" d="M1.583,15.339A2.384,2.384,0,0,1,0,13.027a2.4,2.4,0,0,1,1.586-2.321,11.265,11.265,0,0,1,4.487-.669l.256,0a10.657,10.657,0,0,1,4.3.692,2.367,2.367,0,0,1,1.516,2.28A2.361,2.361,0,0,1,10.7,15.266,9.928,9.928,0,0,1,6.579,16l-.506,0A11.37,11.37,0,0,1,1.583,15.339Zm.848-3.6c-.817.29-1.231.725-1.231,1.293,0,1.138,1.64,1.714,4.873,1.714A11.555,11.555,0,0,0,9.715,14.3c.817-.291,1.231-.726,1.231-1.293,0-1.138-1.64-1.714-4.874-1.714A11.542,11.542,0,0,0,2.432,11.734Zm10.7,1.661a.63.63,0,0,1,.467-.743c.615-.133,1.025-.348,1.135-.592a.718.718,0,0,0,0-.588c-.112-.246-.523-.461-1.144-.591a7.786,7.786,0,0,0-1.205-.182.619.619,0,0,1-.557-.671.61.61,0,0,1,.639-.586,8.822,8.822,0,0,1,1.37.206,2.535,2.535,0,0,1,1.981,1.281,2.033,2.033,0,0,1,0,1.67,2.541,2.541,0,0,1-1.977,1.285.575.575,0,0,1-.122.013A.609.609,0,0,1,13.135,13.4ZM3.165,7.362a4.4,4.4,0,0,1-1.2-3.052,4.393,4.393,0,0,1,1.2-3.051,3.99,3.99,0,0,1,5.817,0,4.394,4.394,0,0,1,1.2,3.051,4.4,4.4,0,0,1-1.2,3.052,3.99,3.99,0,0,1-5.817,0Zm.849-5.213a3.113,3.113,0,0,0-.847,2.161,3.112,3.112,0,0,0,.847,2.161,2.828,2.828,0,0,0,4.119,0,3.109,3.109,0,0,0,.848-2.161,3.11,3.11,0,0,0-.848-2.161,2.83,2.83,0,0,0-4.119,0Zm6.6,4.914a.615.615,0,0,1,.6-.629A2.089,2.089,0,0,0,13.254,4.3a2.09,2.09,0,0,0-2.038-2.138.615.615,0,0,1-.6-.629.616.616,0,0,1,.6-.63,3.321,3.321,0,0,1,3.238,3.4,3.32,3.32,0,0,1-3.238,3.4A.615.615,0,0,1,10.616,7.062Z" transform="translate(0 0)" fill="#777"/>
                        </g>
                    </svg>
                  
               : props.icons === 'vendors' && props.index === '/dashboard/vendors' ? 
                    <svg id="Iconly_Light-outline_2_User" data-name="Iconly/Light-outline/2 User" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                        <g id="_2_User" data-name="2 User" transform="translate(0 0)">
                            <path id="_2_User-2" data-name="2 User" d="M1.583,15.339A2.384,2.384,0,0,1,0,13.027a2.4,2.4,0,0,1,1.586-2.321,11.265,11.265,0,0,1,4.487-.669l.256,0a10.657,10.657,0,0,1,4.3.692,2.367,2.367,0,0,1,1.516,2.28A2.361,2.361,0,0,1,10.7,15.266,9.928,9.928,0,0,1,6.579,16l-.506,0A11.37,11.37,0,0,1,1.583,15.339Zm.848-3.6c-.817.29-1.231.725-1.231,1.293,0,1.138,1.64,1.714,4.873,1.714A11.555,11.555,0,0,0,9.715,14.3c.817-.291,1.231-.726,1.231-1.293,0-1.138-1.64-1.714-4.874-1.714A11.542,11.542,0,0,0,2.432,11.734Zm10.7,1.661a.63.63,0,0,1,.467-.743c.615-.133,1.025-.348,1.135-.592a.718.718,0,0,0,0-.588c-.112-.246-.523-.461-1.144-.591a7.786,7.786,0,0,0-1.205-.182.619.619,0,0,1-.557-.671.61.61,0,0,1,.639-.586,8.822,8.822,0,0,1,1.37.206,2.535,2.535,0,0,1,1.981,1.281,2.033,2.033,0,0,1,0,1.67,2.541,2.541,0,0,1-1.977,1.285.575.575,0,0,1-.122.013A.609.609,0,0,1,13.135,13.4ZM3.165,7.362a4.4,4.4,0,0,1-1.2-3.052,4.393,4.393,0,0,1,1.2-3.051,3.99,3.99,0,0,1,5.817,0,4.394,4.394,0,0,1,1.2,3.051,4.4,4.4,0,0,1-1.2,3.052,3.99,3.99,0,0,1-5.817,0Zm.849-5.213a3.113,3.113,0,0,0-.847,2.161,3.112,3.112,0,0,0,.847,2.161,2.828,2.828,0,0,0,4.119,0,3.109,3.109,0,0,0,.848-2.161,3.11,3.11,0,0,0-.848-2.161,2.83,2.83,0,0,0-4.119,0Zm6.6,4.914a.615.615,0,0,1,.6-.629A2.089,2.089,0,0,0,13.254,4.3a2.09,2.09,0,0,0-2.038-2.138.615.615,0,0,1-.6-.629.616.616,0,0,1,.6-.63,3.321,3.321,0,0,1,3.238,3.4,3.32,3.32,0,0,1-3.238,3.4A.615.615,0,0,1,10.616,7.062Z" transform="translate(0 0)" fill="#fff"/>
                        </g>
                    </svg>
             
                :null
            }
            {props.icons === 'Push Notifications' && props.index !== 'Push Notifications' ?
                    <svg id="noun_notification_1863783" xmlns="http://www.w3.org/2000/svg" width="16" height="19.382" viewBox="0 0 16 19.382">
                        <path id="Path_1" data-name="Path 1" d="M27.816,16.6h0l-.041-.069c-4.906-8.475-4.934-8.517-4.941-8.527a6.24,6.24,0,0,0-4.882-3.332,2.751,2.751,0,0,0-4.576,1.974A5.642,5.642,0,0,0,12,10.348a3.53,3.53,0,0,0,.024.5h0c0,.151-.021.3-.021.454v9.662a1.374,1.374,0,0,0,1.747,1.324l3.858-1.069a2.751,2.751,0,1,0,5.3-1.468l4.092-1.135a1.375,1.375,0,0,0,.822-2.011Zm-6.189,3.889a1.375,1.375,0,0,1-2.7.344l2.644-.732A1.375,1.375,0,0,1,21.627,20.491Zm-8.252.471V11.3a2.258,2.258,0,0,1,.017-.344v-.062a.657.657,0,0,0,0-.117c0-.148-.021-.289-.021-.426a4.277,4.277,0,0,1,1.193-2.967.688.688,0,0,0,.186-.533V6.738a1.375,1.375,0,0,1,2.407-.915.688.688,0,0,0,.512.23H17.7a4.851,4.851,0,0,1,3.964,2.661c.1.172,3.734,6.447,4.927,8.506l.038.065Z" transform="translate(-12 -3.98)" fill="#777"/>
                    </svg> 
               : props.icons === 'Push Notifications' && props.index === 'Push Notifications' ? 
                    <svg id="noun_notification_1863783" xmlns="http://www.w3.org/2000/svg" width="16" height="19.382" viewBox="0 0 16 19.382">
                        <path id="Path_1" data-name="Path 1" d="M27.816,16.6h0l-.041-.069c-4.906-8.475-4.934-8.517-4.941-8.527a6.24,6.24,0,0,0-4.882-3.332,2.751,2.751,0,0,0-4.576,1.974A5.642,5.642,0,0,0,12,10.348a3.53,3.53,0,0,0,.024.5h0c0,.151-.021.3-.021.454v9.662a1.374,1.374,0,0,0,1.747,1.324l3.858-1.069a2.751,2.751,0,1,0,5.3-1.468l4.092-1.135a1.375,1.375,0,0,0,.822-2.011Zm-6.189,3.889a1.375,1.375,0,0,1-2.7.344l2.644-.732A1.375,1.375,0,0,1,21.627,20.491Zm-8.252.471V11.3a2.258,2.258,0,0,1,.017-.344v-.062a.657.657,0,0,0,0-.117c0-.148-.021-.289-.021-.426a4.277,4.277,0,0,1,1.193-2.967.688.688,0,0,0,.186-.533V6.738a1.375,1.375,0,0,1,2.407-.915.688.688,0,0,0,.512.23H17.7a4.851,4.851,0,0,1,3.964,2.661c.1.172,3.734,6.447,4.927,8.506l.038.065Z" transform="translate(-12 -3.98)" fill="#fff"/>
                    </svg> 
                :null
            }
            {props.icons === 'categories' && props.index !== '/dashboard/categories' ?
                    <svg id="Iconly_Light-outline_Category" data-name="Iconly/Light-outline/Category" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                        <g id="Category" transform="translate(0 0)">
                            <path id="Category-2" data-name="Category" d="M11.189,16a2.391,2.391,0,0,1-2.38-2.4V11.153a2.391,2.391,0,0,1,2.38-2.4H13.62a2.391,2.391,0,0,1,2.38,2.4V13.6A2.39,2.39,0,0,1,13.62,16ZM9.925,11.153V13.6a1.274,1.274,0,0,0,1.264,1.28H13.62a1.273,1.273,0,0,0,1.264-1.28V11.153A1.274,1.274,0,0,0,13.62,9.872H11.189A1.274,1.274,0,0,0,9.925,11.153ZM2.38,16A2.391,2.391,0,0,1,0,13.6V11.153a2.391,2.391,0,0,1,2.38-2.4H4.811a2.391,2.391,0,0,1,2.38,2.4V13.6A2.391,2.391,0,0,1,4.811,16ZM1.116,11.153V13.6a1.274,1.274,0,0,0,1.264,1.28H4.811A1.274,1.274,0,0,0,6.075,13.6V11.153A1.274,1.274,0,0,0,4.811,9.872H2.38A1.274,1.274,0,0,0,1.116,11.153ZM11.189,7.244a2.391,2.391,0,0,1-2.38-2.4V2.4A2.391,2.391,0,0,1,11.189,0H13.62A2.39,2.39,0,0,1,16,2.4V4.848a2.39,2.39,0,0,1-2.38,2.4ZM9.925,2.4V4.848a1.274,1.274,0,0,0,1.264,1.28H13.62a1.273,1.273,0,0,0,1.264-1.28V2.4a1.273,1.273,0,0,0-1.264-1.28H11.189A1.274,1.274,0,0,0,9.925,2.4ZM2.38,7.244A2.391,2.391,0,0,1,0,4.848V2.4A2.391,2.391,0,0,1,2.38,0H4.811a2.391,2.391,0,0,1,2.38,2.4V4.848a2.391,2.391,0,0,1-2.38,2.4ZM1.116,2.4V4.848A1.274,1.274,0,0,0,2.38,6.128H4.811a1.274,1.274,0,0,0,1.264-1.28V2.4a1.274,1.274,0,0,0-1.264-1.28H2.38A1.274,1.274,0,0,0,1.116,2.4Z" transform="translate(0 0)" fill="#777"/>
                        </g>
                    </svg> 
               : props.icons === 'categories' && props.index === '/dashboard/categories' ? 
                    <svg id="Iconly_Light-outline_Category" data-name="Iconly/Light-outline/Category" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                        <g id="Category" transform="translate(0 0)">
                            <path id="Category-2" data-name="Category" d="M11.189,16a2.391,2.391,0,0,1-2.38-2.4V11.153a2.391,2.391,0,0,1,2.38-2.4H13.62a2.391,2.391,0,0,1,2.38,2.4V13.6A2.39,2.39,0,0,1,13.62,16ZM9.925,11.153V13.6a1.274,1.274,0,0,0,1.264,1.28H13.62a1.273,1.273,0,0,0,1.264-1.28V11.153A1.274,1.274,0,0,0,13.62,9.872H11.189A1.274,1.274,0,0,0,9.925,11.153ZM2.38,16A2.391,2.391,0,0,1,0,13.6V11.153a2.391,2.391,0,0,1,2.38-2.4H4.811a2.391,2.391,0,0,1,2.38,2.4V13.6A2.391,2.391,0,0,1,4.811,16ZM1.116,11.153V13.6a1.274,1.274,0,0,0,1.264,1.28H4.811A1.274,1.274,0,0,0,6.075,13.6V11.153A1.274,1.274,0,0,0,4.811,9.872H2.38A1.274,1.274,0,0,0,1.116,11.153ZM11.189,7.244a2.391,2.391,0,0,1-2.38-2.4V2.4A2.391,2.391,0,0,1,11.189,0H13.62A2.39,2.39,0,0,1,16,2.4V4.848a2.39,2.39,0,0,1-2.38,2.4ZM9.925,2.4V4.848a1.274,1.274,0,0,0,1.264,1.28H13.62a1.273,1.273,0,0,0,1.264-1.28V2.4a1.273,1.273,0,0,0-1.264-1.28H11.189A1.274,1.274,0,0,0,9.925,2.4ZM2.38,7.244A2.391,2.391,0,0,1,0,4.848V2.4A2.391,2.391,0,0,1,2.38,0H4.811a2.391,2.391,0,0,1,2.38,2.4V4.848a2.391,2.391,0,0,1-2.38,2.4ZM1.116,2.4V4.848A1.274,1.274,0,0,0,2.38,6.128H4.811a1.274,1.274,0,0,0,1.264-1.28V2.4a1.274,1.274,0,0,0-1.264-1.28H2.38A1.274,1.274,0,0,0,1.116,2.4Z" transform="translate(0 0)" fill="#fff"/>
                        </g>
                    </svg> 
                :null
            }
            {props.icons === 'Support Tickets' && props.index !== 'Support Tickets' ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                        <g id="Group" transform="translate(0.75 0.75)">
                        <path id="Vector" d="M3.934,9.423A4.747,4.747,0,0,1,1.392,1.392,4.747,4.747,0,0,1,8.105,8.105,4.716,4.716,0,0,1,3.934,9.423Z" transform="translate(3.506 3.506)" fill="none" stroke="#777" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.5" stroke-dasharray="0 0"/>
                        <g id="Group-2" data-name="Group" transform="translate(1.01 1.01)">
                            <path id="Vector-2" data-name="Vector" d="M0,3.34A4.08,4.08,0,0,0,2.2,2.2,4.115,4.115,0,0,0,3.34,0q2.1,1.74,4.19,3.5a9.152,9.152,0,0,1-1.7,2.34A8.9,8.9,0,0,1,3.5,7.53Q1.76,5.43,0,3.34Z" transform="translate(6.94 6.95)" fill="none" stroke="#777" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke-dasharray="0 0"/>
                            <path id="Vector-3" data-name="Vector" d="M1.7,1.7A9.151,9.151,0,0,1,4.04,0q1.74,2.1,3.5,4.19A4.1,4.1,0,0,0,4.2,7.53C2.8,6.37,1.39,5.2,0,4.04A9.152,9.152,0,0,1,1.7,1.7Z" fill="none" stroke="#777" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke-dasharray="0 0"/>
                        </g>
                        <g id="Group-3" data-name="Group" transform="translate(1.01 1.02)">
                            <path id="Vector-4" data-name="Vector" d="M3.34,7.53A4.08,4.08,0,0,0,2.2,5.33,4.115,4.115,0,0,0,0,4.19Q1.74,2.09,3.5,0A9.152,9.152,0,0,1,5.84,1.7,8.9,8.9,0,0,1,7.53,4.03Q5.43,5.77,3.34,7.53Z" transform="translate(6.95)" fill="none" stroke="#777" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" stroke-dasharray="0 0"/>
                            <path id="Vector-5" data-name="Vector" d="M1.7,5.84A9.152,9.152,0,0,1,0,3.5Q2.1,1.76,4.19,0A4.08,4.08,0,0,0,5.33,2.2a4.115,4.115,0,0,0,2.2,1.14C6.37,4.74,5.2,6.15,4.04,7.54A9.151,9.151,0,0,1,1.7,5.84Z" transform="translate(0 6.93)" fill="none" stroke="#777" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" stroke-dasharray="0 0"/>
                        </g>
                        <path id="Vector-6" data-name="Vector" d="M8.25,16.5A8.25,8.25,0,1,1,16.5,8.25,8.25,8.25,0,0,1,8.25,16.5Z" fill="none" stroke="#777" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke-dasharray="0 0"/>
                        </g>
                    </svg>
               : props.icons === 'Support Tickets' && props.index === 'Support Tickets' ? 
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                        <g id="Group" transform="translate(0.75 0.75)">
                            <path id="Vector" d="M3.934,9.423A4.747,4.747,0,0,1,1.392,1.392,4.747,4.747,0,0,1,8.105,8.105,4.716,4.716,0,0,1,3.934,9.423Z" transform="translate(3.506 3.506)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.5" stroke-dasharray="0 0"/>
                            <g id="Group-2" data-name="Group" transform="translate(1.01 1.01)">
                                <path id="Vector-2" data-name="Vector" d="M0,3.34A4.08,4.08,0,0,0,2.2,2.2,4.115,4.115,0,0,0,3.34,0q2.1,1.74,4.19,3.5a9.152,9.152,0,0,1-1.7,2.34A8.9,8.9,0,0,1,3.5,7.53Q1.76,5.43,0,3.34Z" transform="translate(6.94 6.95)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke-dasharray="0 0"/>
                                <path id="Vector-3" data-name="Vector" d="M1.7,1.7A9.151,9.151,0,0,1,4.04,0q1.74,2.1,3.5,4.19A4.1,4.1,0,0,0,4.2,7.53C2.8,6.37,1.39,5.2,0,4.04A9.152,9.152,0,0,1,1.7,1.7Z" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke-dasharray="0 0"/>
                            </g>
                            <g id="Group-3" data-name="Group" transform="translate(1.01 1.02)">
                                <path id="Vector-4" data-name="Vector" d="M3.34,7.53A4.08,4.08,0,0,0,2.2,5.33,4.115,4.115,0,0,0,0,4.19Q1.74,2.09,3.5,0A9.152,9.152,0,0,1,5.84,1.7,8.9,8.9,0,0,1,7.53,4.03Q5.43,5.77,3.34,7.53Z" transform="translate(6.95)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" stroke-dasharray="0 0"/>
                                <path id="Vector-5" data-name="Vector" d="M1.7,5.84A9.152,9.152,0,0,1,0,3.5Q2.1,1.76,4.19,0A4.08,4.08,0,0,0,5.33,2.2a4.115,4.115,0,0,0,2.2,1.14C6.37,4.74,5.2,6.15,4.04,7.54A9.151,9.151,0,0,1,1.7,5.84Z" transform="translate(0 6.93)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" stroke-dasharray="0 0"/>
                            </g>
                            <path id="Vector-6" data-name="Vector" d="M8.25,16.5A8.25,8.25,0,1,1,16.5,8.25,8.25,8.25,0,0,1,8.25,16.5Z" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke-dasharray="0 0"/>
                        </g>
                    </svg>
                :null
            }
            {props.icons === 'subscriptions' && props.index !== '/dashboard/subscriptions' ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="16.163" height="18" viewBox="0 0 16.163 18">
                        <g id="Group" transform="translate(0.75 0.75)">
                            <path id="Vector" d="M7.331,6.16C3.282,6.16,0,4.781,0,3.08S3.282,0,7.331,0s7.331,1.379,7.331,3.08S11.38,6.16,7.331,6.16Z" fill="none" stroke="#777" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke-dasharray="0 0"/>
                            <path id="Vector-2" data-name="Vector" d="M14.663,0c0,1.7-3.282,3.08-7.331,3.08S0,1.7,0,0" transform="translate(0 6.257)" fill="none" stroke="#777" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke-dasharray="0 0"/>
                            <path id="Vector-3" data-name="Vector" d="M14.663,0c0,1.7-3.282,3.08-7.331,3.08S0,1.7,0,0" transform="translate(0 9.843)" fill="none" stroke="#777" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke-dasharray="0 0"/>
                            <path id="Vector-4" data-name="Vector" d="M14.663,0c0,1.7-3.282,3.08-7.331,3.08S0,1.7,0,0" transform="translate(0 13.42)" fill="none" stroke="#777" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke-dasharray="0 0"/>
                            <path id="Vector-5" data-name="Vector" d="M0,0V10.34" transform="translate(14.663 3.08)" fill="none" stroke="#777" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke-dasharray="0 0"/>
                        </g>
                    </svg>
               : props.icons === 'subscriptions' && props.index === '/dashboard/subscriptions' ? 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16.163" height="18" viewBox="0 0 16.163 18">
                        <g id="Group" transform="translate(0.75 0.75)">
                            <path id="Vector" d="M7.331,6.16C3.282,6.16,0,4.781,0,3.08S3.282,0,7.331,0s7.331,1.379,7.331,3.08S11.38,6.16,7.331,6.16Z" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke-dasharray="0 0"/>
                            <path id="Vector-2" data-name="Vector" d="M14.663,0c0,1.7-3.282,3.08-7.331,3.08S0,1.7,0,0" transform="translate(0 6.257)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke-dasharray="0 0"/>
                            <path id="Vector-3" data-name="Vector" d="M14.663,0c0,1.7-3.282,3.08-7.331,3.08S0,1.7,0,0" transform="translate(0 9.843)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke-dasharray="0 0"/>
                            <path id="Vector-4" data-name="Vector" d="M14.663,0c0,1.7-3.282,3.08-7.331,3.08S0,1.7,0,0" transform="translate(0 13.42)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke-dasharray="0 0"/>
                            <path id="Vector-5" data-name="Vector" d="M0,0V10.34" transform="translate(14.663 3.08)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke-dasharray="0 0"/>
                        </g>
                    </svg>
                :null
            }
            {props.icons === 'rolemanagement' && props.index !== '/dashboard/rolemanagement' ?
                    <svg id="Iconly_Light-outline_3_User" data-name="Iconly/Light-outline/3 User" xmlns="http://www.w3.org/2000/svg" width="14.968" height="12.3" viewBox="0 0 14.968 12.3">
                        <g id="_3_User" data-name="3 User">
                            <path id="_3_User-2" data-name="3 User" d="M2.876,9.973A1.876,1.876,0,0,1,4.081,8.155a8.322,8.322,0,0,1,3.4-.521h.207a7.852,7.852,0,0,1,3.25.541,1.853,1.853,0,0,1,1.147,1.785,1.853,1.853,0,0,1-1.095,1.765,7.273,7.273,0,0,1-3.1.571l-.409,0C4.3,12.3,2.876,11.582,2.876,9.973Zm1.02,0c0,1.024,1.949,1.239,3.584,1.239,2.345,0,3.584-.433,3.584-1.252,0-1.024-1.949-1.239-3.584-1.239C5.136,8.722,3.9,9.155,3.9,9.973Zm8.807.293a.544.544,0,0,1,.4-.642c.444-.1.735-.253.807-.414a.488.488,0,0,0,0-.392c-.073-.163-.366-.319-.816-.413a5.566,5.566,0,0,0-.891-.137.534.534,0,0,1-.474-.58.523.523,0,0,1,.544-.505,6.4,6.4,0,0,1,1.03.159A1.947,1.947,0,0,1,14.828,8.35a1.639,1.639,0,0,1,0,1.327,1.95,1.95,0,0,1-1.522,1.013.482.482,0,0,1-.1.011A.519.519,0,0,1,12.7,10.266Zm-11.041.423A1.95,1.95,0,0,1,.141,9.677a1.633,1.633,0,0,1,0-1.327,1.847,1.847,0,0,1,1.372-.975l.14-.032A6.539,6.539,0,0,1,2.7,7.182a.522.522,0,0,1,.544.505.534.534,0,0,1-.474.58,5.564,5.564,0,0,0-.678.091l-.226.05c-.436.091-.729.247-.8.411a.481.481,0,0,0,0,.391c.072.161.362.317.806.414a.544.544,0,0,1,.4.642.518.518,0,0,1-.5.434A.481.481,0,0,1,1.662,10.689Zm3.6-4.979a3.439,3.439,0,0,1-.916-2.368A3.439,3.439,0,0,1,5.263.976,3.009,3.009,0,0,1,9.7.976a3.442,3.442,0,0,1,.915,2.367A3.441,3.441,0,0,1,9.7,5.711a3.008,3.008,0,0,1-4.437,0Zm.721-3.965a2.321,2.321,0,0,0-.616,1.6,2.322,2.322,0,0,0,.616,1.6,2.032,2.032,0,0,0,2.995,0,2.322,2.322,0,0,0,.616-1.6,2.321,2.321,0,0,0-.616-1.6,2.034,2.034,0,0,0-2.995,0Zm4.835,3.691a.528.528,0,0,1,.51-.544,1.515,1.515,0,0,0,1.463-1.561,1.515,1.515,0,0,0-1.463-1.561.528.528,0,0,1-.51-.544.528.528,0,0,1,.51-.544,2.57,2.57,0,0,1,2.484,2.648,2.57,2.57,0,0,1-2.484,2.649A.528.528,0,0,1,10.818,5.437ZM1.156,3.332A2.57,2.57,0,0,1,3.64.684a.528.528,0,0,1,.51.544.528.528,0,0,1-.51.544A1.515,1.515,0,0,0,2.177,3.332,1.515,1.515,0,0,0,3.64,4.893a.545.545,0,0,1,0,1.088A2.57,2.57,0,0,1,1.156,3.332Z" fill="#777"/>
                        </g>
                    </svg>
               : props.icons === 'rolemanagement' && props.index === '/dashboard/rolemanagement' ? 
                    <svg id="Iconly_Light-outline_3_User" data-name="Iconly/Light-outline/3 User" xmlns="http://www.w3.org/2000/svg" width="14.968" height="12.3" viewBox="0 0 14.968 12.3">
                        <g id="_3_User" data-name="3 User">
                            <path id="_3_User-2" data-name="3 User" d="M2.876,9.973A1.876,1.876,0,0,1,4.081,8.155a8.322,8.322,0,0,1,3.4-.521h.207a7.852,7.852,0,0,1,3.25.541,1.853,1.853,0,0,1,1.147,1.785,1.853,1.853,0,0,1-1.095,1.765,7.273,7.273,0,0,1-3.1.571l-.409,0C4.3,12.3,2.876,11.582,2.876,9.973Zm1.02,0c0,1.024,1.949,1.239,3.584,1.239,2.345,0,3.584-.433,3.584-1.252,0-1.024-1.949-1.239-3.584-1.239C5.136,8.722,3.9,9.155,3.9,9.973Zm8.807.293a.544.544,0,0,1,.4-.642c.444-.1.735-.253.807-.414a.488.488,0,0,0,0-.392c-.073-.163-.366-.319-.816-.413a5.566,5.566,0,0,0-.891-.137.534.534,0,0,1-.474-.58.523.523,0,0,1,.544-.505,6.4,6.4,0,0,1,1.03.159A1.947,1.947,0,0,1,14.828,8.35a1.639,1.639,0,0,1,0,1.327,1.95,1.95,0,0,1-1.522,1.013.482.482,0,0,1-.1.011A.519.519,0,0,1,12.7,10.266Zm-11.041.423A1.95,1.95,0,0,1,.141,9.677a1.633,1.633,0,0,1,0-1.327,1.847,1.847,0,0,1,1.372-.975l.14-.032A6.539,6.539,0,0,1,2.7,7.182a.522.522,0,0,1,.544.505.534.534,0,0,1-.474.58,5.564,5.564,0,0,0-.678.091l-.226.05c-.436.091-.729.247-.8.411a.481.481,0,0,0,0,.391c.072.161.362.317.806.414a.544.544,0,0,1,.4.642.518.518,0,0,1-.5.434A.481.481,0,0,1,1.662,10.689Zm3.6-4.979a3.439,3.439,0,0,1-.916-2.368A3.439,3.439,0,0,1,5.263.976,3.009,3.009,0,0,1,9.7.976a3.442,3.442,0,0,1,.915,2.367A3.441,3.441,0,0,1,9.7,5.711a3.008,3.008,0,0,1-4.437,0Zm.721-3.965a2.321,2.321,0,0,0-.616,1.6,2.322,2.322,0,0,0,.616,1.6,2.032,2.032,0,0,0,2.995,0,2.322,2.322,0,0,0,.616-1.6,2.321,2.321,0,0,0-.616-1.6,2.034,2.034,0,0,0-2.995,0Zm4.835,3.691a.528.528,0,0,1,.51-.544,1.515,1.515,0,0,0,1.463-1.561,1.515,1.515,0,0,0-1.463-1.561.528.528,0,0,1-.51-.544.528.528,0,0,1,.51-.544,2.57,2.57,0,0,1,2.484,2.648,2.57,2.57,0,0,1-2.484,2.649A.528.528,0,0,1,10.818,5.437ZM1.156,3.332A2.57,2.57,0,0,1,3.64.684a.528.528,0,0,1,.51.544.528.528,0,0,1-.51.544A1.515,1.515,0,0,0,2.177,3.332,1.515,1.515,0,0,0,3.64,4.893a.545.545,0,0,1,0,1.088A2.57,2.57,0,0,1,1.156,3.332Z" fill="#fff"/>
                        </g>
                    </svg>
                :null
            }
            {props.icons === 'accountsettings' && props.index !== '/dashboard/accountsettings' ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="16.28" height="18.01" viewBox="0 0 16.28 18.01">
                        <g id="Group" transform="translate(0.842 0.75)">
                            <path id="Vector" d="M2.57,5.14A2.57,2.57,0,1,1,5.14,2.57,2.57,2.57,0,0,1,2.57,5.14Z" transform="translate(4.734 5.681)" fill="none" stroke="#777" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke-dasharray="0 0"/>
                            <path id="Vector-2" data-name="Vector" d="M13.557,3.336a1.241,1.241,0,0,0-1.761-.5L11.37,3.1A1.289,1.289,0,0,1,9.441,1.9V1.374A1.332,1.332,0,0,0,8.156,0H6.436A1.332,1.332,0,0,0,5.151,1.374V1.9A1.289,1.289,0,0,1,3.222,3.1L2.8,2.836a1.248,1.248,0,0,0-1.761.5L.176,4.924A1.434,1.434,0,0,0,.643,6.806l.426.259a1.422,1.422,0,0,1,0,2.382L.643,9.7a1.426,1.426,0,0,0-.467,1.882l.86,1.588a1.241,1.241,0,0,0,1.761.5l.426-.259a1.289,1.289,0,0,1,1.928,1.2v.526A1.332,1.332,0,0,0,6.436,16.51h1.72a1.332,1.332,0,0,0,1.286-1.374V14.61a1.289,1.289,0,0,1,1.928-1.2l.426.259a1.248,1.248,0,0,0,1.761-.5l.86-1.588A1.434,1.434,0,0,0,13.949,9.7l-.426-.259a1.422,1.422,0,0,1,0-2.382l.426-.259a1.428,1.428,0,0,0,.467-1.882Z" transform="translate(0)" fill="none" stroke="#777" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke-dasharray="0 0"/>
                        </g>
                    </svg>
               : props.icons === 'accountsettings' && props.index === '/dashboard/accountsettings' ? 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16.28" height="18.01" viewBox="0 0 16.28 18.01">
                        <g id="Group" transform="translate(0.842 0.75)">
                            <path id="Vector" d="M2.57,5.14A2.57,2.57,0,1,1,5.14,2.57,2.57,2.57,0,0,1,2.57,5.14Z" transform="translate(4.734 5.681)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke-dasharray="0 0"/>
                            <path id="Vector-2" data-name="Vector" d="M13.557,3.336a1.241,1.241,0,0,0-1.761-.5L11.37,3.1A1.289,1.289,0,0,1,9.441,1.9V1.374A1.332,1.332,0,0,0,8.156,0H6.436A1.332,1.332,0,0,0,5.151,1.374V1.9A1.289,1.289,0,0,1,3.222,3.1L2.8,2.836a1.248,1.248,0,0,0-1.761.5L.176,4.924A1.434,1.434,0,0,0,.643,6.806l.426.259a1.422,1.422,0,0,1,0,2.382L.643,9.7a1.426,1.426,0,0,0-.467,1.882l.86,1.588a1.241,1.241,0,0,0,1.761.5l.426-.259a1.289,1.289,0,0,1,1.928,1.2v.526A1.332,1.332,0,0,0,6.436,16.51h1.72a1.332,1.332,0,0,0,1.286-1.374V14.61a1.289,1.289,0,0,1,1.928-1.2l.426.259a1.248,1.248,0,0,0,1.761-.5l.86-1.588A1.434,1.434,0,0,0,13.949,9.7l-.426-.259a1.422,1.422,0,0,1,0-2.382l.426-.259a1.428,1.428,0,0,0,.467-1.882Z" transform="translate(0)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke-dasharray="0 0"/>
                        </g>
                    </svg>
                :null
            }
        </>
    )
}
