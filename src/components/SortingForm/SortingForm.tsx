import React from "react";
import { connect } from "react-redux";
import { Formik, Field, Form } from "formik";
import { ApplicationState } from "../../store";
import { SortingFormStyled } from "./SortingForm.styled";
import { Option, SubmitButton } from "../SharedStyledComponents/Form.styled";
import { sort } from "../../store/sorting/actions";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const sortingTypes = [
    { value: "POPULARITY_ASC", label: "Popularność - rosnąco" },
    { value: "POPULARITY_DESC", label: "Popularność - malejąco" },
    { value: "DATE_ASC", label: "Data - rosnąco" },
    { value: "DATE_DESC", label: "Data - malejąco" }
];

const SortingForm = (props: Props) => {
    let { sorting } = props.sorting;

    return (
        <Formik
            initialValues={{
                sorting: sorting
            }}
            onSubmit={(values: any) => {
                console.log(values);
                props.sort(values.sorting);
            }}
            render={() => (
                <SortingFormStyled>
                    <Field name="sorting" component="select">
                        {sortingTypes.map((s, index) => {
                            return (
                                <Option value={s.value} key={index}>
                                    {s.label}
                                </Option>
                            );
                        })}
                    </Field>

                    <SubmitButton type="submit">Sortuj</SubmitButton>
                </SortingFormStyled>
            )}
        />
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return { sorting: state.sorting };
};

const mapDispatchToProps = {
    sort
};

export default connect(mapStateToProps, mapDispatchToProps)(SortingForm);
