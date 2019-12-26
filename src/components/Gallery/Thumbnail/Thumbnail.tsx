import React from "react";
import Loader from "../../Loader/Loader";
import { StyledThumb } from "./Thumbnail.styled";

type Props = {
    file: any;
};

class Thumbnail extends React.Component<Props> {
    state = {
        loading: false,
        thumb: undefined
    };

    componentWillReceiveProps(nextProps: any) {
        if (!nextProps.file) {
            return;
        }

        this.setState({ loading: true }, () => {
            let reader = new FileReader();

            reader.onloadend = () => {
                this.setState({ loading: false, thumb: reader.result });
            };

            reader.readAsDataURL(nextProps.file);
        });
    }

    render() {
        const { file } = this.props;
        const { loading, thumb } = this.state;

        if (!file) {
            return null;
        }

        if (loading) {
            return <Loader></Loader>;
        }

        return <StyledThumb src={thumb} alt={file.name} />;
    }
}

export default Thumbnail;
