import setuptools

setuptools.setup(
    name="streamlit-org-chart",
    version="0.0.1",
    author="Ken McGrady",
    author_email="ken.mcgrady@gmail.com",
    description="Fancy Org Chart",
    long_description="Fancy Org Chart Component for Streamlit",
    long_description_content_type="text/plain",
    url="https://github.com/kmcgrady/streamlit-org-chart",
    packages=setuptools.find_packages(),
    include_package_data=True,
    classifiers=[],
    python_requires=">=3.6",
    install_requires=[
        # By definition, a Custom Component depends on Streamlit.
        # If your component has other Python dependencies, list
        # them here.
        "streamlit >= 0.75",
    ],
)
