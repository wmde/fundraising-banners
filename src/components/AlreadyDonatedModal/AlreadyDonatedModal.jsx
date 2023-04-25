import { h } from 'preact';
import PropTypes from 'prop-types';
import { useContext } from 'preact/hooks';
import TranslationContext from '../../shared/TranslationContext';
import classNames from 'classnames';
import ButtonClose from '../ButtonClose/ButtonClose';

export default function AlreadyDonatedModal( props ) {
	const Translations = useContext( TranslationContext );
	const Content = props.content;

	return;
}

AlreadyDonatedModal.propTypes = {
	content: PropTypes.element.isRequired,
	isVisible: PropTypes.bool.isRequired,
	onHide: PropTypes.func.isRequired,
	onMaybeLater: PropTypes.func.isRequired,
	onGoAway: PropTypes.func.isRequired
};
