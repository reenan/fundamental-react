/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Alert, Icon } from '../';
import { Description, DocsText, DocsTile, Header, Import, Playground, Properties, Separator } from '../_playground';

export const AlertComponent = () => {
    const defaultAlertCode = '<Alert dismissible link="#" linkText="link">Default alert with a </Alert>';

    const warningAlertCode = `<Alert type="warning" dismissible>
    <h3>A dismissible error type alert with template.</h3>
    <p>More information...</p>
</Alert>`;

    const errorAlertCode = `<Alert type="error" dismissible>
    <Icon glyph="message-error" /> Error Message.
    <a href="#" class="fd-link">
        Learn More
    </a>
</Alert>`;

    const sucessAlertCode = `<Alert type="success" dismissible>
    <Icon glyph="message-success" /> Message Success.
    <a href="#" class="fd-link">
        Learn More
    </a>
</Alert>`;

    const informationAlertCode = `<Alert type="information" dismissible>
    <Icon glyph="message-information" /> Information Message.
    <a href="#" class="fd-link">
        Learn More
    </a>
</Alert>`;

    return (
        <div>
            <Header>Alert</Header>
            <Description>
                An **Alert** provides a message within the application that is color-coded to emphasize the level of urgency.
            </Description>
            <Import sourceModule={require('./Alert')} />

            <Separator />

            <Properties sourceModule={require('./Alert')} />

            <Separator />

            <h2>Default Alert</h2>
            <Description>
                The alert provides information that is useful and relevant, but not critical. It can also provide
                feedback that an action has been executed. The user will need to dismiss the message.
            </Description>
            <DocsTile>
                <Alert dismissible link='#'
                    linkText=' link'>
                    Default alert with a{' '}
                </Alert>
            </DocsTile>
            <DocsText>{defaultAlertCode}</DocsText>

            <Separator />

            <h2>Warning Alert</h2>
            <Description>
                The alert warns of potential issues, but the user can still continue. The user will need to dismiss the
                message.
            </Description>
            <DocsTile>
                <Alert dismissible type='warning'>
                    <h3>A dismissible error type alert with template.</h3>
                    <p>More information...</p>
                </Alert>
            </DocsTile>
            <DocsText>{warningAlertCode}</DocsText>

            <Separator />

            <h2>Error Alert</h2>
            <Description>
                This alert is triggered after the user entered data incorrectly or a system error has occurred. It
                should interrupt the user. A final action such as Submit cannot be carried out until the user has
                rectified the error. The user will need to dismiss the message.
            </Description>
            <DocsTile>
                <Alert dismissible type='error'>
                    <Icon glyph='message-error' /> Error Message.{' '}
                    <a className='fd-link' href='#'>
                        Learn More
                    </a>
                </Alert>
            </DocsTile>
            <DocsText>{errorAlertCode}</DocsText>

            <Separator />

            <h2>Success Alert</h2>
            <DocsTile>
                <Alert dismissible type='success'>
                    <Icon glyph='message-success' /> Message Success.{' '}
                    <a className='fd-link' href='#'>
                        Learn More
                    </a>
                </Alert>
            </DocsTile>
            <DocsText>{sucessAlertCode}</DocsText>

            <Separator />

            <h2>Information Alert</h2>
            <DocsTile>
                <Alert dismissible type='information'>
                    <Icon glyph='message-information' /> Information Message.{' '}
                    <a className='fd-link' href='#'>
                        Learn More
                    </a>
                </Alert>
            </DocsTile>
            <DocsText>{informationAlertCode}</DocsText>

            <Separator />

            <h2>Playground</h2>
            <Playground
                component='alert'
                schema={[
                    {
                        attribute: 'type',
                        typeOfAttribute: 'string',
                        'enum': ['', 'warning', 'error', 'information', 'success']
                    },
                    {
                        attribute: 'dismissible',
                        typeOfAttribute: 'boolean'
                    }
                ]}>
                <Alert dismissible={false} link='#'
                    linkText='link'>
                    Default alert with a{' '}
                </Alert>
            </Playground>
        </div>
    );
};
