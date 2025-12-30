import streamlit as st

st.set_page_config(page_title="Bluetree Portal", layout="centered")

st.title("🚀 Bluetree Admin Portal")
st.markdown("### Choose a module")

if st.button("🕒 Shift Templates"):
    st.switch_page("pages/1_Shift_Templates.py")
